{ div, h2, h3, h4, hr, a, table, thead, tr, th, tbody, td } = React.DOM

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
    div className: 'users',
      h2 className: 'user', "#{@state.user.name}"
      h4 className: 'school', "#{@state.school.name}"
      hr {}
      div className: 'films',
        h3 className: 'title', 'Films'
        hr {}
        table className: 'table table-bordered',
          thead {},
            tr {},
              th {}, 'Name'
              th {}, 'Director'
              th {}, 'Description'
              th {}, 'Release Date'
              th {}
          tbody {},
            for film in @state.films
              tr {},
                td {},
                  a href: "/films/#{film.id}", film.name
                td {}, film.director
                td {}, film.description
                td {}, film.release_date
                td {}
