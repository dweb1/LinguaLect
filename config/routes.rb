Rails.application.routes.draw do

  root to: 'flashcards#index' 

  resources :flashcards

  namespace :api do
    get 'flashcards/get_data/:category', to: "flashcards#pull_api_data_for_flashcard"
    resources :categories do
      resources :flashcards
    end
  end

end
