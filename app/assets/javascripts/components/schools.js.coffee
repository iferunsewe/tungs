@Schools = React.createClass
  getInitialState: ->
    schools: @props.data
  getDefaultProps: ->
    schools: []
  render: ->
    React.DOM.div
      className: 'schools'
      React.DOM.h2
        className: 'title'
        'Schools'
      React.DOM.table
        class: 'table table-bordered'
        React.DOM.thead null,
          React.DOM.tr null,
            React.DOM.th null, 'Name'
            React.DOM.th null, 'Address'
        React.DOM.tbody null,
          for school in @state.schools
            React.createElement School, key: school.id, school: school
