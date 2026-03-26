# frozen_string_literal: true

class StockMovementsController < ApplicationController
  before_action :authenticate_user!

  def index
    movements = StockMovement.includes(:item, :user).order(created_at: :desc)
    movements = movements.where(item_id: params[:item_id]) if params[:item_id].present?
    render json: movements.as_json(include: { item: { only: %i[id sku name] }, user: { only: %i[id email] } })
  end

  def create
    item = Item.find(movement_params[:item_id])
    movement = StockMovements::Create.new(
      item: item,
      user: current_user,
      movement_type: movement_params[:movement_type],
      quantity: movement_params[:quantity],
      quantity_delta: movement_params[:quantity_delta],
      reference: movement_params[:reference],
      note: movement_params[:note]
    ).call

    render json: {
      movement: movement,
      stock_level: { item_id: item.id, quantity: item.stock_level.reload.quantity }
    }, status: :created
  end

  private

  def movement_params
    params.require(:stock_movement).permit(:item_id, :movement_type, :quantity, :quantity_delta, :reference, :note)
  end
end
