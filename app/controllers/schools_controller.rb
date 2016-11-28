class SchoolsController < ApplicationController
  before_action :authenticate_user!

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

  def update
    @school = School.find(params[:id])

    if @school.update(school_params)
      render json: @school
    else
      render json: @school.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @school = School.find(params[:id])
    @school.destroy
    head :no_content
  end

  private

  def school_params
    params.require(:school).permit(:name, :address)
  end
end
