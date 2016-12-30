class Memory < ApplicationRecord
  validates :text, presence: true
  validates :translation, presence: true

  belongs_to :user
  belongs_to :film
  belongs_to :language
end
