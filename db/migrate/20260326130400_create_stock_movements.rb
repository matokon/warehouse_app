# frozen_string_literal: true

class CreateStockMovements < ActiveRecord::Migration[7.2]
  def change
    create_table :stock_movements do |t|
      t.references :item, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :movement_type, null: false
      t.integer :quantity_delta, null: false
      t.string :reference
      t.text :note

      t.timestamps
    end

    add_check_constraint :stock_movements, "quantity_delta <> 0", name: "quantity_delta_non_zero"
  end
end
