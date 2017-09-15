import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import CategoryList from './components/CategoryList';
import Flashcard from "./components/Flashcard";
import TranslatePage from "./components/TranslatePage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import UserProfile from "./components/UserProfile"

import {parseString} from 'xml2js'
import {setAxiosDefaults} from './util';
import styled from 'styled-components';
import axios from 'axios'

const Footer = styled.div `
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
      user: {},
      loggedIn: false,
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
    setAxiosDefaults();
  }

  _addUserToState = (response) => {
    const userData = response.data.data;
    const newState = {
      ...this.state
    }
    newState.user = userData
    this.setState(newState);
  }

  _loadData = async() =>{
  if (this.state.user.email) {
    await this._fetchLanguages();
    this._fetchCategories()
  }
}

  _fetchCategories = async() => {
    try {
      const res = await axios.get('/api/categories');
      const categories = res.data;
      this.setState({categories});
    } catch (error) {
      this.setState({error});
    }
  }

  _fetchLanguages = async() => {
    try {
      const res = await axios.get('/api/languages');
      const languages = res.data;
      const newState = {
        ...this.state
      }
      newState.languages.all_languages = languages
      this.setState(newState);
    } catch (error) {
      this.setState({error});
    }
  }

  _languageToSelection = (event) => {
    const languageToName = event.target.value;
    const languageToCode = document
      .querySelector(`option[name=${languageToName}]`)
      .getAttribute('data-code')
    const newState = {
      ...this.state
    }
    newState.languages.to_language_name = languageToName
    newState.languages.to_language_code = languageToCode
    this.setState(newState)
  }

  _languageFromSelection = (event) => {
    const languageFromName = event.target.value;
    const languageFromCode = document
      .querySelector(`option[name=${languageFromName}]`)
      .getAttribute('data-code')
    const newState = {
      ...this.state
    }
    newState.languages.from_language_name = languageFromName
    newState.languages.from_language_code = languageFromCode
    this.setState(newState)
  }

  _translateText = async() => {
    const textEntered = document
      .getElementById("textEntered")
      .value;
    const newState = {
      ...this.state
    }
    newState.languages.textEntered = textEntered
    this.setState(newState)
    try {
      let authToken = await axios.post('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', {}, {
        headers: {
          'Ocp-Apim-Subscription-Key': '249fcfda00204d70855549cad0545a72'
        }
      })
      authToken = `Bearer ${authToken.data}`;
      let res = await axios.get(`http://api.microsofttranslator.com/V2/Http.svc/Translate?text=${textEntered}&from=${this.state.languages.from_language_code}&to=${this.state.languages.to_language_code}`, {
        transformRequest: [(data, headers) => {
          delete headers['access-token']
          delete headers['uid']
          delete headers['client']
          delete headers['expiry']
          delete headers['token-type']
          delete headers.common
          return data;
        }],
        params: {
          'appid': authToken
        }
      })
      var xml = res.data
      parseString(xml, (err, result) => {
        const newState = {
          ...this.state
        }
        newState.languages.text_translated = result.string._
        this.setState(newState)
      });
    } catch (error) {
      this.setState({error})
    }
  }

  _translateMainWord = async() => {
    try {
      let authToken = await axios.post('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', {}, {
        headers: {
          'Ocp-Apim-Subscription-Key': '249fcfda00204d70855549cad0545a72'
        }
      })
      authToken = `Bearer ${authToken.data}`;
      let res = await axios.get(`https://api.microsofttranslator.com/V2/Http.svc/Translate?text=${this.state.flashcard.main_word}&from=${this.state.languages.from_language_code}&to=${this.state.languages.to_language_code}`, {
        transformRequest: [(data, headers) => {
          delete headers['access-token']
          delete headers['uid']
          delete headers['client']
          delete headers['expiry']
          delete headers['token-type']
          delete headers.common
          return data;
        }],
        params: {
          'appid': authToken
        }
      })
      var xml = res.data
      parseString(xml, (err, result) => {
        const newState = {
          ...this.state
        }
        newState.flashcard.translated_main_word = result.string._
        this.setState(newState)
      });
    } catch (error) {
      this.setState({error})
    }
  }

  _fetchSpecificCategoryClicked = (event, category) => {
    const newState = {
      ...this.state
    }
    newState.flashcard.category = category.name
    this.setState(newState)
  }

  _fetchDataForFlashcard = async() => {
    const catName = this.state.flashcard.category
    const res = await axios.get(`/api/flashcards/get_data/${catName}`)
    this.setState({
      flashcard: {
        main_word: res.data[0].word,
        correct_answer: res.data[0].word,
        options: res
          .data
          .sort(function (a, b) {
            return 0.5 - Math.random()
          }),
        category: catName,
        translated_main_word: ""
      }
    })
  }

  _addUserToState = (response) => {
    const newState = {...this.state}
    newState.user = response.data.data
    newState.loggedIn = true
    this.setState(newState)
  }

  _isLoggedIn = async () => {
    if (this.state.user && this.state.loggedIn){
      return {
        user: this.state.user,
        loggedIn: this.state.loggedIn
      }
    }
    const response = await axios.get("/auth/validate_token");
    this.setState({
      user: response.data.data,
      loggedIn: response.data.success
    });
    // this.props.addUserToState(response);
  };

  _logOut = async () => {
    console.log("CLICK");
    const response = await axios.delete("/auth/sign_out");
    //Forces refresh of browser
    window.location.reload();
  };

  render() {

    const FlashcardComponent = () => (<Flashcard
      state={this.state}
      translateWord={this._translateMainWord}
      fetchData={this._fetchDataForFlashcard}
      fetchCategories={this._fetchCategories}/>)

    const CategoryListComponent = () => (<CategoryList
      languageTo={this._languageToSelection}
      languageFrom={this._languageFromSelection}
      fetchCategories={this._fetchCategories}
      fetchSpecificCategory={this._fetchSpecificCategoryClicked}
      state={this.state}
      loadData={this._loadData}/>)

    const TranslatePageComponent = () => (<TranslatePage
      languageTo={this._languageToSelection}
      languageFrom={this._languageFromSelection}
      translateText={this._translateText}
      state={this.state}
      loadData={this._loadData}/>)

    const UserProfileComponent = () => (<UserProfile 
      user={this.state.user} />)

    const SignInComponent = () => (<SignIn
      addUserToState={this._addUserToState} />)

    const HomeComponent = () => (<Home state={this.state}/>)

    return (
      <Router>
        <div className="App">
          <div>
            <NavBar addUserToState={this._addUserToState} logOut={this._logOut} isLoggedIn={this._isLoggedIn} state={this.state}/>
          </div>
          <Route exact path="/user" render={UserProfileComponent} />
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/signUp" component={SignUp}/>
          <Route exact path="/signIn" render={SignInComponent}/>
          <Route exact path="/categories" render={CategoryListComponent}/>
          <Route
            exact
            path="/categories/:category_id/flashcards"
            render={FlashcardComponent}/>
          <Route exact path="/translate" render={TranslatePageComponent}/>

          <Footer>© 2017 -- David Weber</Footer>
        </div>
      </Router>
    );
  }
}

export default App;