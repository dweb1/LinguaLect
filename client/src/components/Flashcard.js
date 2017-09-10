import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Flashcard extends Component {
    
    constructor() {
        super();
        this.state = {
            flashcard: {
                main_word: "",
                options: [],
                correct_answer: "",
                category: ""
            }
        }
    }

    componentWillMount(){
        // this._fetchDataForFlashcard();
    }

    _fetchDataForFlashcard = async () => {
        const res = await axios.get(`https://od-api.oxforddictionaries.com/api/v1/wordlist/en/domains%3DCooking`, {
            timeout: 5000,
            headers: {
                'app_id': '4aaa8e8b',
                'app_key': '127bf340b31bab6a0cbe8cbde38dae2e'
            }
        })
        this.setState({
            main_word: res.data.main_word,
            correct_answer: res.data.correct_answer,
            options: res.data.options,
            category: res.data.category,
        })
    }

    render () {
    
        return (
        <div>
            <p>Word: {this.state.main_word}</p>
        </div>
        )
    }
}

export default Flashcard;