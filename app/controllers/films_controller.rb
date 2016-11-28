class FilmsController < ApplicationController

  private

  def film_params
    params.require(:film).permit(:name, :description, :release_date, :director)
  end
end
