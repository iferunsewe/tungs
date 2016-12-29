class Memory < ApplicationRecord
  validates [:text, :translation], presence: true

  belongs_to :user, :film, :language
end
