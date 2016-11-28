module UsersHelper
  def films_for_user(user)
    films = []
    user.school.languages.each do |language|
      language.films.each do |film|
        films << film unless films.include? film
      end
    end
    films
  end
end
