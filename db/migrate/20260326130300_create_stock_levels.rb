# frozen_string_literal: true

class CreateStockLevels < ActiveRecord::Migration[7.2]
  def change
    create_table :stock_levels do |t|
      t.references :item, null: false, foreign_key: true, index: { unique: true }
      t.integer :quantity, null: false, default: 0

      t.timestamps
    end
  end
end
