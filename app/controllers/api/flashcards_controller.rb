class Api::FlashcardsController < ApplicationController

    def index
        @flashcards = Flashcard.all 
        render json: @flashcards
    end

    def show
        @flashcard = Flashcard.find(params[:id])
        render json: @flashcard
    end

    def create
        @flashcard = Flashcard.create!(flashcard_params)
        redirect_to '/api/flashcards/:id'
    end

    def update
        @flashcard = Flashcard.find(params[:id])
        @flashcard.update!(flashcard_params)
        redirect_to '/api/flashcards/:id'
    end

    def destroy
        @flashcard = Flashcard.find(params[:id])
        @flashcard.destroy
        redirect_to api_flashcards
    end

    private
    def flashcard_params
        params.require(:flashcard).permit(:main_word, :category, :correct_answer, :options)
    end   
end
