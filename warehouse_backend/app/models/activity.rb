class Activity < ApplicationRecord
  belongs_to :team
  belongs_to :user

  enum :action, received: 0, picked: 1, counted: 2

  def user_name
      user.email
  end
end
