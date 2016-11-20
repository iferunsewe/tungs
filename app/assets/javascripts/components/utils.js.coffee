Functions =
  getMetaContent: (name) ->
    metas = document.getElementsByTagName('meta')
    i = 0
    while i < metas.length
      if metas[i].getAttribute('name') == name
        return metas[i].getAttribute('content')
      i++
    ''