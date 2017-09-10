import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CategoryList from './components/CategoryList';
import Flashcard from "./components/Flashcard";
import "./App.css";

class App extends Component {

  render() {
    
    return (
      <Router>
        <div className="App">
          <div>
            <h1>LinguaLect</h1>
            <div>
              <Link to="/flashcards">Flashcard</Link>
            </div>
          </div>
          <Route exact path="/flashcards/categories" component={CategoryList} />
          <Route exact path="/flashcards/:id" component={Flashcard} />
        </div>
      </Router>
    );
  }
}

export default App;