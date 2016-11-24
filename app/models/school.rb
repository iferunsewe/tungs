class School < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true

  has_many :users
  has_and_belongs_to_many :languages
end
