class Activity < ApplicationRecord
  belongs_to :team
  belongs_to :user

  enum :action, received: 0, picked: 1, deleted: 2, created: 3

  def user_name
      user.name
  end
end
