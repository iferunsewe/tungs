@User = React.createClass
  getInitialState: ->
    user: @props.data

  getDefaultProps: ->
    user: {}

  render: ->
    React.DOM.div
      className: 'users'
      React.DOM.h2
        className: 'title'
        "#{@state.user.name}"
      React.DOM.hr null


