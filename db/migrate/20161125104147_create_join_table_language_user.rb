class CreateJoinTableLanguageUser < ActiveRecord::Migration[5.0]
  def change
    create_join_table :languages, :users do |t|
      t.index :language_id
      t.index :user_id
    end
  end
end
