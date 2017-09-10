class Category < ApplicationRecord
    has_many :flashcards, dependent: :destroy
end
