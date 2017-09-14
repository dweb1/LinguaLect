class Api::LanguagesController < ApplicationController
    before_action :authenticate_user!
    def index
        @languages = Language.all 
        render json: @languages
    end

end
