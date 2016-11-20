@RegisterForm = React.createClass
  _handleInputChange: (ev) ->
    # Get a deep clone of the component's state before the input change.
    nextState = _.cloneDeep(@state)
    # Update the state of the component
    nextState[ev.target.name] = ev.target.value
    # Update the component's state with the new state
    @setState nextState

  getInitialState: ->
    email: ''
    password: ''
    password_confirmation: ''
    name: ''

  _handleRegistrationClick: (e) ->
    $.ajax
      method: 'POST'
      url: '/users.json'
      data:
        user:
          email: @state.email
          uid: @state.email
          password: @state.password
          password_confirmation: @state.password_confirmation
          name: @state.name
          provider: 'email'
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
          type: 'name'
          name: 'name'
          placeholder: 'name'
          value: @state.name
          onChange: @state._handleInputChange()
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'password'
          name: 'password'
          placeholder: 'password'
          value: @state.password
          onChange: @state._handleInputChange()
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'password'
          name: 'password_confirmation'
          placeholder: 're-type password'
          value: @state.password_confirmation
          onChange: @state._handleInputChange()
      React.DOM.button
        type: 'submit'
        className: 'btn btn-primary'
        defaultValue: 'sign up'
        onClick: @state._handleRegistrationClick()
        'Sign up'
