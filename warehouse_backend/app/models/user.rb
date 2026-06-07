# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist
  belongs_to :team, optional: true

  has_many :owned_teams, class_name: "Team", foreign_key: "owner_id", dependent: :destroy
  has_many :activities
  
end
