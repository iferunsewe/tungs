class FilmsController < ApplicationController
  def film_params
    params.require(:film).permit(:name, :description, :release_date, :director, :school_id, :user_id)
  end
end
