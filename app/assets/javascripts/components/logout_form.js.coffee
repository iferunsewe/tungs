@LogoutForm = React.createClass
  _signOut: ->
    $.ajax
      method: 'DELETE'
      url: '/users/sign_out.json'
      data:
        authenticity_token: Function.getMetaContent('csrf-token')
      success: ->
        location.reload
  render: ->
    React.DOM.a
      href: '#'
      onClick: @state._signOut
      'Logout'
