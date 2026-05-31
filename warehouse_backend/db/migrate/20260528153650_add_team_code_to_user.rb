class AddTeamCodeToUser < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :team_code, :string
    add_column :users, :string, :string
  end
end
