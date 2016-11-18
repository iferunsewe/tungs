@School = React.createClass
  getInitialState: ->
    edit: false

  handleToggle: (e) ->
    e.preventDefault()
    @setState edit: !@state.edit

  handleDelete: (e) ->
    e.preventDefault()

    $.ajax
      method: 'DELETE'
      url: "/schools/#{ @props.school.id  }"
      dataType: 'JSON'
      success: () =>
        @props.handleDeleteSchool @props.school

  handleEdit: (e) ->
    e.preventDefault()
    data =
      name: ReactDOM.findDOMNode(@refs.name).value
      address: ReactDOM.findDOMNode(@refs.address).value
    $.ajax
      method: 'PUT'
      url: "/schools/#{ @props.school.id }"
      dataType: 'JSON'
      data:
        school: data
      success: (data) =>
        @setState edit:false
        @props.handleEditSchool @props.school, data

  schoolRow: ->
    React.DOM.tr null,
      React.DOM.td null, @props.school.name
      React.DOM.td null, @props.school.address
      React.DOM.td null,
        React.DOM.a
          className: 'btn btn-default'
          onClick: @handleToggle
          'Edit'
        React.DOM.a
          className: 'btn btn-danger'
          onClick: @handleDelete
          'Delete'

  schoolForm: ->
    React.DOM.tr null,
      React.DOM.td null,
        React.DOM.input
          className: 'form-control'
          type: 'text'
          defaultValue: @props.school.name
          ref: 'name'
      React.DOM.td null,
        React.DOM.input
          className: 'form-control'
          type: 'text'
          defaultValue: @props.school.address
          ref: 'address'
      React.DOM.td null,
        React.DOM.a
          className: 'btn btn-default'
          onClick: @handleEdit
          'Update'
        React.DOM.a
          className: 'btn btn-danger'
          onClick: @handleToggle
          'Cancel'

  render: ->
    if @state.edit
      @schoolForm()
    else
      @schoolRow()