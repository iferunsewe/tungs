class Language < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_and_belongs_to_many :schools
  has_and_belongs_to_many :users
  has_and_belongs_to_many :films
  has_many :memories
end
