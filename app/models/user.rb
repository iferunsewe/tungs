class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Optional so I can create user to test with in development
  belongs_to :school, optional: true
  has_many :user_languages
  has_many :languages, through: :user_languages
  has_many :memories
  has_and_belongs_to_many :native_language
end
