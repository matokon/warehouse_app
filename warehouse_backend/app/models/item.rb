# frozen_string_literal: true

class Item < ApplicationRecord
  has_one :stock_level, dependent: :destroy
  has_many :stock_movements, dependent: :destroy

  validates :sku, presence: true, uniqueness: true
  validates :name, presence: true

  after_create :ensure_stock_level

  private

  def ensure_stock_level
    create_stock_level!(quantity: 0)
  end
end
