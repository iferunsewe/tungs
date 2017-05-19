class SubtitlesController < ApplicationController

  private

  def subtitle_params
    params.require(:school).permit(:source)
  end
end
