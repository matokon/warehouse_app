class RemoveTeamCodeFromUsers < ActiveRecord::Migration[8.1]
  def change
    remove_column :users, :team_code, :string
  end
end
