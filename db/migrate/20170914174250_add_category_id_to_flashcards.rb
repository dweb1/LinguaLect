class AddCategoryIdToFlashcards < ActiveRecord::Migration[5.1]
  def change
    add_reference :flashcards, :category, foreign_key: true
  end
end
