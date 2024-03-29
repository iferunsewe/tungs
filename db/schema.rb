# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170114143425) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "films", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "release_date"
    t.string   "director"
    t.text     "source"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "films_languages", id: false, force: :cascade do |t|
    t.integer "film_id",     null: false
    t.integer "language_id", null: false
    t.index ["film_id"], name: "index_films_languages_on_film_id", using: :btree
    t.index ["language_id"], name: "index_films_languages_on_language_id", using: :btree
  end

  create_table "languages", force: :cascade do |t|
    t.string   "name"
    t.string   "language_code"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "languages_schools", id: false, force: :cascade do |t|
    t.integer "language_id", null: false
    t.integer "school_id",   null: false
    t.index ["language_id"], name: "index_languages_schools_on_language_id", using: :btree
    t.index ["school_id"], name: "index_languages_schools_on_school_id", using: :btree
  end

  create_table "memories", force: :cascade do |t|
    t.string   "text"
    t.string   "translation"
    t.integer  "time_in_video"
    t.integer  "user_id"
    t.integer  "film_id"
    t.integer  "language_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["film_id"], name: "index_memories_on_film_id", using: :btree
    t.index ["language_id"], name: "index_memories_on_language_id", using: :btree
    t.index ["user_id"], name: "index_memories_on_user_id", using: :btree
  end

  create_table "schools", force: :cascade do |t|
    t.string   "name"
    t.text     "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subtitles", force: :cascade do |t|
    t.text     "source"
    t.integer  "film_id"
    t.integer  "language_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["film_id"], name: "index_subtitles_on_film_id", using: :btree
    t.index ["language_id"], name: "index_subtitles_on_language_id", using: :btree
  end

  create_table "user_languages", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "language_id"
    t.boolean  "know"
    t.boolean  "learning"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["language_id"], name: "index_user_languages_on_language_id", using: :btree
    t.index ["user_id"], name: "index_user_languages_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "name"
    t.datetime "age"
    t.string   "role"
    t.integer  "school_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["school_id"], name: "index_users_on_school_id", using: :btree
  end

end
