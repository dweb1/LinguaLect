import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CategoryList from './components/CategoryList';
import Flashcard from "./components/Flashcard";
import "./App.css";
import styled from 'styled-components';

const Nav = styled.div`
  color: white;
  background-color: #355fa3;
  display: flex;
  justify-content: space-between
`
const NavButton = styled.div`
  background-color:white;
  margin: 20px 0;
  color: #355fa3
`
const Logo = styled.div`
  h1{
    text-decoration: none
  }
`

class App extends Component {

  render() {
    
    return (
      <Router>
        <div className="App">
          <Nav>
            <Logo>
            <Link to="/">
              <h1>LinguaLect</h1>
            </Link>
            </Logo>
            <NavButton>
              <Link to="/categories">Flashcard</Link>
            </NavButton>
          </Nav>
          <Route exact path="/categories" component={CategoryList} />
          <Route exact path="/categories/:category_id/flashcards" component={Flashcard} />
        </div>
      </Router>
    );
  }
}

export default App;