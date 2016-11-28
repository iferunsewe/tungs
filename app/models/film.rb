class Film < ApplicationRecord
  validates :name, presence: true
  validates :release_date, presence: true

  has_and_belongs_to_many :languages
end
