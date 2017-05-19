class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: :show

  def show
    @school = @user.school
    @films = helpers.films_for_user(@user)
  end

  def current_user_home
    redirect_to current_user
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
