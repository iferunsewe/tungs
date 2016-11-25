class CreateJoinTableFilmSchool < ActiveRecord::Migration[5.0]
  def change
    create_join_table :films, :schools do |t|
      t.index :film_id
      t.index :school_id
    end
  end
end
