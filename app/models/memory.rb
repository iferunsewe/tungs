class Memory < ApplicationRecord
  after_commit { MemoryBroadcastJob.perform_later self }
  validates :text, presence: true
  validates :translation, presence: true
  validates :time_in_video, presence: true

  belongs_to :user
  belongs_to :film
  belongs_to :language
end
