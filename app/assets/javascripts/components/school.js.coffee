@School = React.createClass
  handleDelete: (e) ->
    e.preventDefault()

    $.ajax
      method: 'DELETE'
      url: "/schools/#{ @props.school.id  }"
      dataType: 'JSON'
      success: () =>
        @props.handleDeleteSchool @props.school

  render: ->
    React.DOM.tr null,
      React.DOM.td null, @props.school.name
      React.DOM.td null, @props.school.address
      React.DOM.td null,
        React.DOM.a
          className: 'btn btn-danger'
          onClick: @handleDelete
          'Delete'