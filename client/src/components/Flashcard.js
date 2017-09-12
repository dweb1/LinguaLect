import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Flashcard extends Component {
    
    constructor() {
        super();
        this.state = {
            error: "",
            categories: [],
            flashcard: {
                main_word: "",
                options: [],
                correct_answer: "",
                category: ""
            }
        }
    }

    componentWillMount = async () => {
        await this._fetchCategories();
        this._fetchDataForFlashcard();
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

    _fetchDataForFlashcard = async () => {
        let categoryId = this.props.match.params.category_id
        categoryId -= 1
        const catName = this.state.categories[categoryId].name
        const res =  await axios.get(`/api/categories/:category_id/flashcards/get_data/${catName}`)
        console.log(catName)
        console.log(res.data.results)
        this.setState({
        //     // main_word: res.data.main_word,
        // //     correct_answer: res.data.correct_answer,
            options: res.data.results[0],
        //     // category: res.data.category,
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