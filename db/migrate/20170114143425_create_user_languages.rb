class CreateUserLanguages < ActiveRecord::Migration[5.0]
  def change
    create_table :user_languages do |t|
      t.belongs_to :user, index: true
      t.belongs_to :language, index: true
      t.boolean :know
      t.boolean :learning

      t.timestamps
    end
  end
end
