# frozen_string_literal: true

module StockMovements
  class Create
    class InsufficientStock < StandardError; end

    def initialize(item:, user:, movement_type:, quantity:, quantity_delta: nil, reference: nil, note: nil)
      @item = item
      @user = user
      @movement_type = movement_type
      @quantity = quantity
      @quantity_delta = quantity_delta
      @reference = reference
      @note = note
    end

    def call
      movement = nil
      Item.transaction do
        stock_level = @item.stock_level.lock!
        delta = resolve_delta!
        new_quantity = stock_level.quantity + delta
        raise InsufficientStock, "Insufficient stock (would be #{new_quantity})" if new_quantity.negative?

        movement = @item.stock_movements.create!(
          user: @user,
          movement_type: @movement_type,
          quantity_delta: delta,
          reference: @reference,
          note: @note
        )

        stock_level.update!(quantity: new_quantity)
      end
      movement
    end

    private

    def resolve_delta!
      return Integer(@quantity_delta) if @quantity_delta
      raise ArgumentError, "quantity is required" if @quantity.nil?

      qty = Integer(@quantity)
      raise ArgumentError, "quantity must be non-zero" if qty.zero?

      case @movement_type.to_s
      when "receipt"
        qty.abs
      when "issue"
        -qty.abs
      when "adjustment"
        qty
      else
        raise ArgumentError, "unknown movement_type #{@movement_type}"
      end
    end
  end
end
