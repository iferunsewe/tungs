class SchoolsController < ApplicationController
  def index
    @schools = School.all
  end

  private

  def school_params
    params.require(:user).permit(:name, :address)
  end
end
