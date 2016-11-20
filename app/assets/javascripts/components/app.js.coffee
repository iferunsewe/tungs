@App = React.createClass
  componentWillMount: ->
    $.ajax
      method: 'GET'
      url: "/auth/is_signed_in.json"
      dataType: 'JSON'
      success: ((data) =>
        @setState signedIn: data.signed_in
      ).bind(this)

  getInitialState: ->
    signedIn: null

  ReactRouter.run (Handler) ->
    render: ->
      Handler signedIn=@state.signedIn
