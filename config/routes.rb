Rails.application.routes.draw do
  resources :subtitles
  resources :memories
  devise_for :users
  resources :films
  resources :languages
  resources :schools
  resources :users

  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'schools#index'
end
