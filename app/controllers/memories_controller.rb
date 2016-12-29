class MemoriesController < ApplicationController
  before_action :authenticate_user!

  private

  def memory_params
    params.require(:memory).permit(:text, :translation)
  end
end
