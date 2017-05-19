class Film < ApplicationRecord
  validates :name, presence: true
  validates :release_date, presence: true

  has_and_belongs_to_many :languages
  has_many :memories
  has_many :subtitles
end
