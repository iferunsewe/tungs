@School = React.createClass
  render: ->
    React.DOM.tr null,
      React.DOM.td null, @props.school.name
      React.DOM.td null, @props.school.address