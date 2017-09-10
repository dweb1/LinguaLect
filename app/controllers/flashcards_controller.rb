class FlashcardsController < ApplicationController

    def index
        @flashcards = Flashcard.all
    end

    def show
       @flashcard = Flashcard.find(params[:id]) 
    end

    def new
        @flashcard = Flashcard.new
    end

    def create
        @flashcard = Flashcard.create!(flashcard_params)
        redirect_to flashcard_path
    end

    def edit
        @flashcard = Flashcard.find(params[:id])
    end

    def update
        @flashcard = Flashcard.find(params[:id])
        @flashcard.update(flashcard_params)
        redirect_to flashcard_path(@flashcard)
    end

    def destroy
        @flashcard = Flashcard.find(params[:id])
        @flashcard.destroy
        redirect_to flashcards_path
    end

    private
    def flashcard_params
        params.require(:flashcard).permit(:main_word, :category, :correct_answer, :options)
    end  
end
