@User = React.createClass
  getInitialState: ->
    user: @props.user
    school: @props.school
    films: @props.films

  getDefaultProps: ->
    user: {}
    school: {}
    films: []

  render: ->
    React.DOM.div
      className: 'users'
      React.DOM.h2
        className: 'user'
        "#{@state.user.name}"
      React.DOM.h4
        className: 'school'
        console.log(@props)
        "#{@state.school.name}"
      React.DOM.hr null
      React.DOM.div
        className: 'films'
        React.DOM.h3
          className: 'title'
          'Films'
        React.DOM.hr null
        React.DOM.table
          className: 'table table-bordered'
          React.DOM.thead null,
            React.DOM.tr null,
              React.DOM.th null, 'Name'
              React.DOM.th null, 'Director'
              React.DOM.th null, 'Description'
              React.DOM.th null, 'Release Date'
              React.DOM.th null
          React.DOM.tbody null,
            for film in @state.films
              React.DOM.tr null,
                React.DOM.td null, film.name
                React.DOM.td null, film.director
                React.DOM.td null, film.description
                React.DOM.td null, film.release_date
                React.DOM.td null
