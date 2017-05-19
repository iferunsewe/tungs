class Subtitle < ApplicationRecord
  validates :source, presence: true

  belongs_to :film
  belongs_to :language
end
