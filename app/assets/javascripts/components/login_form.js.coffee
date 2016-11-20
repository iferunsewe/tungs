@LoginForm = React.createClass
  _handleInputChange: ->
#   Get a deep clone of the component's state before the input change.
    nextState = _.cloneDeep(@state);
#   Update the state of the component
    nextState[ev.target.name] = ev.target.value;
#   Update the component's state with the new state
    @setState nextState

  getInitialState: ->
    email: ''
    password: ''

  _handleSignInClick: (e) ->
    $.ajax
      method: 'POST'
      url: 'users/sign_in.json'
      dataType: 'JSON'
      data:
        user:
          email: @state.email
          password: @state.password
        authenticity_token: Functions.getMetaContent('csrf-token')
      success: ((data) =>
        location.reload
      ).bind(this)

  render: ->
    React.DOM.form
      className: 'form-group'
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'email'
          name: 'email'
          placeholder: 'email'
          value: @state.email
          onChange: @state._handleInputChange()
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'password'
          name: 'password'
          placeholder: 'password'
          value: @state.password
          onChange: @state._handleInputChange()
      React.DOM.button
        type: 'submit'
        className: 'btn btn-primary'
        defaultValue: 'login'
        onClick: @state._handleSignInClick()
        'Login'
