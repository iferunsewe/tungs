@Schools = React.createClass
  getInitialState: ->
    schools: @props.data

  getDefaultProps: ->
    schools: []

  addSchool: (school) ->
    schools = @state.schools.slice()
    schools.push school
    @setState schools: schools

  deleteSchool: (school) ->
    schools = @state.schools.slice()
    index = schools.indexOf school
    schools.splice index, 1
    @replaceState schools: schools

  render: ->
    React.DOM.div
      className: 'schools'
      React.DOM.h2
        className: 'title'
        'Schools'
      React.createElement SchoolForm, handleNewSchool: @addSchool
      React.DOM.hr null
      React.DOM.table
        className: 'table table-bordered'
        React.DOM.thead null,
          React.DOM.tr null,
            React.DOM.th null, 'Name'
            React.DOM.th null, 'Address'
            React.DOM.th null
        React.DOM.tbody null,
          for school in @state.schools
            React.createElement School, key: school.id, school: school, handleDeleteSchool: @deleteSchool
