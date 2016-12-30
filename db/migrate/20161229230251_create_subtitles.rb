class CreateSubtitles < ActiveRecord::Migration[5.0]
  def change
    create_table :subtitles do |t|
      t.text :source
      t.references :film, index: true
      t.references :language, index: true

      t.timestamps
    end
  end
end
