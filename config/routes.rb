Rails.application.routes.draw do
  resources :schools
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'schools#index'
end
