class UserController < ApplicationController
  before_filter :authenticate_user!
  before_action :set_user, only: :show

  def show

  end

  private

  def set_user
    @player = Player.find(params[:id])
  end

end
