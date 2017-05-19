class Language < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :language_code, presence: true, uniqueness: true

  has_and_belongs_to_many :schools
  has_many :user_languages
  has_many :users, through: :user_languages
  has_and_belongs_to_many :films
  has_many :memories
  has_many :subtitles
end
