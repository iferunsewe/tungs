class CreateJoinTableFilmLanguage < ActiveRecord::Migration[5.0]
  def change
    create_join_table :films, :languages do |t|
      t.index :film_id
      t.index :language_id
    end
  end
end
