class CreateMemories < ActiveRecord::Migration[5.0]
  def change
    create_table :memories do |t|
      t.string :text
      t.string :translation
      t.integer :time_in_video
      t.references :user, index: true
      t.references :film, index: true
      t.references :language, index: true

      t.timestamps
    end
  end
end
