class School < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true

  has_and_belongs_to_many :languages
  has_many :users
end
