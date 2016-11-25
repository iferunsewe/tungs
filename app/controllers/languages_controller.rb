class LanguagesController < ApplicationController
  def language_params
    params.require(:language).permit(:name)
  end
end
