class FilmsController < ApplicationController
  before_action :set_film, only: :show

  def show
  end

  private

  def set_film
    @film = Film.find(params[:id])
  end

  def film_params
    params.require(:film).permit(:name, :description, :release_date, :director)
  end
end
