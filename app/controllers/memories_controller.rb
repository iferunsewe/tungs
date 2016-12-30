class MemoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @memories = Memory.all
  end

  def create
    @memory = Memory.new(memory_params)

    if @memory.save
      render json: @memory
    else
      render json: @memory.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @memory = Memory.find(params[:id])
    @memory.destroy
    head :no_content
  end

  private

  def memory_params
    params.require(:memory).permit(:text, :translation, :user_id, :film_id, :language_id)
  end
end
