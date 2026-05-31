# frozen_string_literal: true

class Team < ApplicationRecord
  belongs_to :owner, class_name: "User"

  has_many :members, class_name: "User", dependent: :nullify
  has_many :items, dependent: :destroy

  validates :name, presence: true
  validates :access_code, presence: true, uniqueness: true
end
