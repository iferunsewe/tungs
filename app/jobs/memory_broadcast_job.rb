class MemoryBroadcastJob < ApplicationJob
  queue_as :default

  def perform(memory)
    ActionCable.server.broadcast 'memory_channel', memory: render_memory(memory)
  end

  private

  def render_memory(memory)
    ApplicationController.renderer.render(partial: 'memories/new_memory_row', locals: {memory: memory})
  end
end
