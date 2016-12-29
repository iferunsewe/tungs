Rails.application.routes.draw do
  resources :memories
  devise_for :users
  resources :films
  resources :languages
  resources :schools
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'schools#index'
end
