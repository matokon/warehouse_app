# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :team, optional: true

  validates :name, presence: true
end
