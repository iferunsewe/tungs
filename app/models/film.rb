class Film < ApplicationRecord
  validates :name, presence: true
  validates :relsease_date, presence: true

  has_and_belongs_to_many :languages
  belongs_to :school
  belongs_to :user
end
