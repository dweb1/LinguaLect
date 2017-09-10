class CreateFlashcards < ActiveRecord::Migration[5.1]
  def change
    create_table :flashcards do |t|
      t.string :main_word
      t.string :correct_answer
      t.string :options, array: true, default: []
      t.string :category

      t.timestamps
    end
  end
end
