class AddTeamIdToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :team_id, :integer
  end
end
