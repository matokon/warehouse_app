class CreateTeams < ActiveRecord::Migration[8.1]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :access_code
      t.integer :owner_id

      t.timestamps
    end
  end
end
