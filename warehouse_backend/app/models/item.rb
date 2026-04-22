# frozen_string_literal: true

class Item < ApplicationRecord
  validates :sku, presence: true, uniqueness: true
  validates :name, presence: true
end
