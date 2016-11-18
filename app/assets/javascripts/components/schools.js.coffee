@Schools = React.createClass
  getInitialState: ->
    schools: @props.data

  getDefaultProps: ->
    schools: []

  addSchool: (school) ->
    schools = React.addons.update(@state.schools, { $push: [school] })
    @setState schools: schools

  deleteSchool: (school) ->
    index = @state.schools.indexOf school
    schools = React.addons.update(@state.schools, { $splice: [[index, 1]] })
    @replaceState schools: schools

  updateSchool: (school, data) ->
    index = @state.schools.indexOf school
    schools = React.addons.update(@state.schools, {splice: [[index, 1, data]]})
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
            React.createElement School, key: school.id, school: school, handleDeleteSchool: @deleteSchool, handleEditSchool: @updateSchool
