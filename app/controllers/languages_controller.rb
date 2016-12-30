class LanguagesController < ApplicationController
  before_action :authenticate_user!

  private

  def language_params
    params.require(:language).permit(:name, :language_code)
  end
end
