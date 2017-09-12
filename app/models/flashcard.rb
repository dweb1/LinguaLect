class Flashcard < ApplicationRecord
    belongs_to :category
    include HTTParty
    base_uri "https://od-api.oxforddictionaries.com/api/v1/wordlist/en"

    def self.find_data_for_card(category)
        res = get "/domains%3D#{category}", {
            headers: {
                'app_id': '4aaa8e8b',
                'app_key': '127bf340b31bab6a0cbe8cbde38dae2e'
            }
        }
        JSON.parse(res.body)
    end
end
