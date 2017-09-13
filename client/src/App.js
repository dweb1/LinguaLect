import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CategoryList from './components/CategoryList';
import Flashcard from "./components/Flashcard";
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
        language_code: "en",
        language_name: "English",
        categories: [],
        flashcard: {
            main_word: "",
            options: [],
            correct_answer: "",
            category: ""
          }
      }
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
    }})
  }
  
  render() {
    
  const FlashcardComponent = () => (
    <Flashcard state={this.state} fetchData={this._fetchDataForFlashcard} fetchCategories={this._fetchCategories}/>
  )

  const CategoryListComponent = () => (
    <CategoryList fetchCategories={this._fetchCategories} fetchSpecificCategory={this._fetchSpecificCategoryClicked} state={this.state} />
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
          <Route exact path="/selectLanguage" />
          <Route exact path="/categories" render={CategoryListComponent} />
          <Route exact path="/categories/:category_id/flashcards" render={FlashcardComponent} />
        <Footer>© 2017 -- David Weber</Footer>
        </div>
      </Router>
    );
  }
}

export default App;