Flashcard.destroy_all
Language.destroy_all

Language.create({language_code: "en", language_name: "English"})
Language.create({language_code: "ar", language_name: "Arabic"})
Language.create({language_code: "fr", language_name: "French"})
Language.create({language_code: "de", language_name: "German"})
Language.create({language_code: "hi", language_name: "Hindi"})
Language.create({language_code: "it", language_name: "Italian"})
Language.create({language_code: "tlh", language_name: "Klingon"})
Language.create({language_code: "es", language_name: "Spanish"})
Language.create({language_code: "ru", language_name: "Russian"})
Language.create({language_code: "pt", language_name: "Portuguese"})

Category.destroy_all

Category.create({name: "Art"})
Category.create({name: "Food"})
Category.create({name: "Education"})
Category.create({name: "Geography"})
Category.create({name: "Sport"})
Category.create({name: "Clothing"})