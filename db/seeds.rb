# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# s1 = School.create name: 'Queensdale High School', address: '1 Queensdale Road, London, SE1 1DA'
# s2 = School.create name: 'Runmill College', address: '1 Runmill Street, Oxford, OX1 1HC'
#
# f1 = Film.create name: 'La Haine', description: "When a young Arab is arrested and beaten unconscious by police, a riot erupts in the notoriously violent suburbs outside of Paris. Three of the victim's peers, Vinz (Vincent Cassel), Said (Said Taghmaoui) and Hubert (Hubert Koundé), wander aimlessly about their home turf in the aftermath of the violence as they try to come to grips with their outrage over the brutal incident. After one of the men finds a police officer's discarded weapon, their night seems poised to take a bleak turn.", release_date: DateTime.parse('November 17, 1995'), director: 'Mathieu Kassovitz', source: 'les_obejts_wtf_2.mp4'
# f2 = Film.create name: 'The Intouchables', description: 'An unlikely friendship develops between a wealthy quadriplegic (François Cluzet) and his caretaker (Omar Sy), just released from prison.', release_date: DateTime.parse('September 21, 2012'), director: 'Olivier Nakache, Eric Toledano', source: 'les_obejts_wtf_2.mp4'
# f3 = Film.create name: "Pan's Labyrinth", description: "In 1944 Spain young Ofelia (Ivana Baquero) and her ailing mother (Ariadna Gil) arrive at the post of her mother's new husband (Sergi López), a sadistic army officer who is trying to quell a guerrilla uprising. While exploring an ancient maze, Ofelia encounters the faun Pan, who tells her that she is a legendary lost princess and must complete three dangerous tasks in order to claim immortality.", release_date: DateTime.parse('November 24, 2006'), director: 'Guillermo del Toro', source: 'les_obejts_wtf_2.mp4'
# f4 = Film.create name: 'All About My Mother', description: 'A Greek saying states that only women who have washed their eyes with tears can see clearly. This saying does not hold true for Manuela. The night a car ran over her son Esteban, Manuela cried until her eyes ran completely dry. Far from seeing clearly, the present and the future become mixed up in darkness. She begins looking for his father who has become a transvestite.', release_date: DateTime.parse('August 27, 1999'), director: 'Pedro Almodóvar', source: 'les_obejts_wtf_2.mp4'
# f5 = Film.create name: 'A Clockwork Orange', description: "In an England of the future, Alex (Malcolm McDowell) and his 'Droogs' spend their nights getting high at the Korova Milkbar before embarking on 'a little of the old ultraviolence,' while jauntily warbling 'Singin' in the Rain.' After he's jailed for bludgeoning the Cat Lady to death, Alex submits to behavior modification technique to earn his freedom; he's conditioned to abhor violence. Returned to the world defenseless, Alex becomes the victim of his prior victims.", release_date: DateTime.parse('January 13, 1972'), director: 'Stanley Kubrick', source: 'les_obejts_wtf_2.mp4'
# f6 = Film.create name: 'Four Weddings and a Funeral', description: "Lovable Englishman Charles (Hugh Grant) and his group of friends seem to be unlucky in love. When Charles meets a beautiful American named Carrie (Andie MacDowell) at a wedding, he thinks his luck may have changed. But, after one magical night, Carrie returns to the States, ending what might have been. As Charles and Carrie's paths continue to cross -- over a handful of nuptials and one funeral -- he comes to believe they are meant to be together, even if their timing always seems to be off.", release_date: DateTime.parse('May 13, 1994'), director: 'Mike Newell', source: 'les_obejts_wtf_2.mp4'
#
# english = Language.create name: 'English',  language_code: 'en'
# french = Language.create name: 'French', language_code: 'fr'
# spanish = Language.create name: 'Spanish',  language_code: 'es'
#
# ife = User.create!(name: 'Ife Runsewe', email: 'test@email.com', password: 'password', school_id: s2.id)
#
# s1.languages = [french, spanish]
# s2.languages = [french, english]
#
# f1.languages = [french, english]
# f2.languages = [french, spanish]
# f3.languages = [spanish, english]
# f4.languages = [spanish, french]
# f5.languages = [english, french]
# f6.languages = [english, spanish]
#
# sub1 = Subtitle.create source: 'les_obejts_wtf_2_en.vtt',film_id: f1.id, language_id: english.id
# sub2 = Subtitle.create source: 'les_obejts_wtf_2_fr.vtt',film_id: f1.id, language_id: french.id

User.find(1).native_language = 'English'


