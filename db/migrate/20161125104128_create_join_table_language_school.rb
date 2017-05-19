class CreateJoinTableLanguageSchool < ActiveRecord::Migration[5.0]
  def change
    create_join_table :languages, :schools do |t|
      t.index :language_id
      t.index :school_id
    end
  end
end
