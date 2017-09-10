Rails.application.routes.draw do

  root to: 'flashcards#index'

  resources :flashcards

  namespace :api do
    resources :flashcards
  end

end
