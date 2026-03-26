# frozen_string_literal: true

class StockMovement < ApplicationRecord
  belongs_to :item
  belongs_to :user

  enum :movement_type, { receipt: 0, issue: 1, adjustment: 2 }

  validates :movement_type, presence: true
  validates :quantity_delta, numericality: { other_than: 0 }
end
