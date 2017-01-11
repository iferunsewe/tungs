App.memory = App.cable.subscriptions.create "MemoryChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $("tbody").prepend data['memory']
    # Called when there's incoming data on the websocket for this channel
