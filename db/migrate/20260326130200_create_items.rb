# frozen_string_literal: true

class CreateItems < ActiveRecord::Migration[7.2]
  def change
    create_table :items do |t|
      t.string :sku, null: false
      t.string :name, null: false
      t.text :description
      t.string :unit, null: false, default: "pcs"

      t.timestamps
    end

    add_index :items, :sku, unique: true
  end
end
