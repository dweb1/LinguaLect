import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CategoryList from './components/CategoryList';
import Flashcard from "./components/Flashcard";
import TranslatePage from "./components/TranslatePage";

import { parseString } from 'xml2js'
import styled from 'styled-components';
import axios from 'axios'

const Nav = styled.div`
  color: white;
  display: flex;
  background-color: rgba(53, 95, 163, 1);
  justify-content: space-between
`

const NavButton = styled.div`
  background-color: white;
  text-decoration: none;
  color: #355fa3;
  margin: 20px 15px;
  padding: 15px 15px;
  border-radius: 4px;
  :hover {
    background-color: rgb(0, 72, 156);
      a {
          color: white
      }
  }
  a {
      text-decoration: none;
      display: block
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 30px;
`

const Logo = styled.div`
  h1 {
    color:white;
    padding: 15px 15px;
  }
  a {
    text-decoration: none
  }
`

const Footer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #355fa3;
  text-align: center;
  color: white
`

class App extends Component {

  constructor() {
    super();
    this.state = {
        error: "",
        languages: {
          to_language_code: null,
          to_language_name: null,
          from_language_code: null,
          from_language_name: null,
          text_translated: null,
          textEntered: null,
          all_languages: []
        },
        categories: [],
        flashcard: {
            main_word: "",
            translated_main_word: "",
            options: [],
            correct_answer: "",
            category: ""
          }
      }
  }

  componentWillMount = () => {
    this._fetchCategories();
    this._fetchLanguages();
  }

  _fetchCategories = async () => {
    try {
        const res = await axios.get('/api/categories');
        const categories = res.data;
        this.setState({categories});
    } catch (error) {
        this.setState({error});
    }
  }

  _fetchLanguages = async () => {
    try {
        const res = await axios.get('/api/languages');
        const languages = res.data;
        const newState = {...this.state}
        newState.languages.all_languages = languages
        this.setState(newState);
    } catch (error) {
        this.setState({error});
    }
  }

  _translateText = async () => {
    const textEntered = document.getElementById("textEntered").value;
    const newState = {...this.state}
    newState.languages.textEntered = textEntered
    this.setState(newState)
    try {
        let authToken = await axios.post('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', {}, {
          headers: {'Ocp-Apim-Subscription-Key': '249fcfda00204d70855549cad0545a72'}})
        authToken = `Bearer ${authToken.data}`;
        let res = await axios.get(`http://api.microsofttranslator.com/V2/Http.svc/Translate?text=${textEntered}&from=${this.state.languages.from_language_code}&to=${this.state.languages.to_language_code}`, {
          params: {
            'appid': authToken
          },
        })
        var xml = res.data
        parseString(xml, (err, result) => {
          const newState = {...this.state}  
          newState.languages.text_translated = result.string._
          this.setState(newState)
        });
      } catch (error){
        this.setState({error})
      }
    }

  _translateMainWord = async () => {
    try {
      let authToken = await axios.post('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', {}, {
        headers: {'Ocp-Apim-Subscription-Key': '249fcfda00204d70855549cad0545a72'}})
      authToken = `Bearer ${authToken.data}`;
      let res = await axios.get(`http://api.microsofttranslator.com/V2/Http.svc/Translate?text=${this.state.flashcard.main_word}&from=${this.state.languages.from_language_code}&to=${this.state.languages.to_language_code}`, {
        params: {
          'appid': authToken
        },
      })
      var xml = res.data
      parseString(xml, (err, result) => {
        const newState = {...this.state}  
        newState.flashcard.translated_main_word = result.string._
        this.setState(newState)
      });
    } catch (error){
      this.setState({error})
    }
  }

  _fetchSpecificCategoryClicked = (event, category) => {
    const newState = {...this.state}
    newState.flashcard.category = category.name
    this.setState(newState)
  }

  _fetchDataForFlashcard = async () => {
    const catName = this.state.flashcard.category
    const res =  await axios.get(`/api/flashcards/get_data/${catName}`)
    this.setState({
        flashcard: {
        main_word: res.data[0].word,
        correct_answer: res.data[0].word,
        options: res.data.sort(function(a, b){return 0.5 - Math.random()}),
        category: catName,
        translated_main_word: ""
    }})
  }
  
  render() {
    
  const FlashcardComponent = () => (
    <Flashcard state={this.state} translateWord={this._translateMainWord} fetchData={this._fetchDataForFlashcard} fetchCategories={this._fetchCategories}/>
  )

  const CategoryListComponent = () => (
    <CategoryList fetchCategories={this._fetchCategories} fetchSpecificCategory={this._fetchSpecificCategoryClicked} state={this.state} />
  )

  const TranslatePageComponent = () => (
    <TranslatePage translateText={this._translateText} state={this.state} />
  )

    return (
      <Router>
        <div className="App">
          <Nav>
          <Logo>
            <Link to="/">
                <h1>LinguaLect</h1>
            </Link>
            </Logo>
            <Buttons>
              <NavButton>
                <Link to="/translate">Translate</Link>
              </NavButton>
              <NavButton>
                <Link to="/categories">Flashcard</Link>
              </NavButton>
            </Buttons>
          </Nav>
          <Route exact path="/categories" render={CategoryListComponent} />
          <Route exact path="/categories/:category_id/flashcards" render={FlashcardComponent} />
          <Route exact path="/translate" render={TranslatePageComponent} />

        <Footer>© 2017 -- David Weber</Footer>
        </div>
      </Router>
    );
  }
}

export default App;