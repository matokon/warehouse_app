class RemoveStringColumnFromUsers < ActiveRecord::Migration[8.1]
  def change
    remove_column :users, :string, :string
  end
end
