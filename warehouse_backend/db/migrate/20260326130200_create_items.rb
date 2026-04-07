# frozen_string_literal: true

class CreateItems < ActiveRecord::Migration[7.2]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.text :description
      t.string :unit, null: false, default: "pcs"
      t.integer :quantity, null: false, default: 0
      
      t.timestamps
    end
  end
end
