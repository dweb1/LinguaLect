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
  background-color: white;
  text-decoration: none;
  color: #355fa3;
  margin: 20px 15px;
  padding: 15px 15px;
  box-shadow: 1px 1px 5px black;
  :hover {
      background-color: rgba(53, 95, 163, 0.3);
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
            <Buttons>
              <NavButton>
                <Link to="/translate">Translate</Link>
              </NavButton>
              <NavButton>
                <Link to="/categories">Flashcard</Link>
              </NavButton>
            </Buttons>
          </Nav>
          <Route exact path="/categories" component={CategoryList} />
          <Route exact path="/categories/:category_id/flashcards" component={Flashcard} />
        <Footer>© 2017 -- David Weber</Footer>
        </div>
      </Router>
    );
  }
}

export default App;