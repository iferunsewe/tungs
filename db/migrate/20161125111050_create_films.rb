class CreateFilms < ActiveRecord::Migration[5.0]
  def change
    create_table :films do |t|
      t.string :name
      t.text :description
      t.datetime :release_date
      t.string :director

      t.timestamps
    end
  end
end
