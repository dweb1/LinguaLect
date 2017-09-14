Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  root to: 'flashcards#index' 

  resources :flashcards

  namespace :api do
    get 'flashcards/get_data/:category', to: "flashcards#pull_api_data_for_flashcard"
    resources :languages
    resources :categories do
      resources :flashcards
    end
  end

end
