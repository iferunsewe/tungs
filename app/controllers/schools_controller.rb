class SchoolsController < ApplicationController
  def index
    @schools = School.all
  end

  def create
    @school = School.new(school_params)

    if @school.save
      render json: @school
    else
      render json: @school.errors, status: :unprocessable_entity
    end
  end

  private

  def school_params
    params.require(:school).permit(:name, :address)
  end
end
