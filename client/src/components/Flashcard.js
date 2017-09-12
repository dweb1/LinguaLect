import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OptionCard from './OptionCard';
import styled from 'styled-components'

const OptionBox = styled.div`
    display: flex;
    margin: 20px 5%;
    width: 90%;
    justify-content: space-around;
    flex-wrap: wrap
`

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
        const res =  await axios.get(`/api/flashcards/get_data/${catName}`)
        this.setState({
            flashcard: {
            main_word: res.data[0].word,
            correct_answer: res.data[0].word,
            options: res.data,
            category: catName,
        }})
    }

    render () {
    
        return (
        <div>
            <p>Word: {this.state.flashcard.main_word}</p>
            <OptionBox>
            {this.state.flashcard.options.map((option, index) => {
               return <OptionCard key={index} id={index} word={option.word}/>
            })}
            </OptionBox>
        </div>
        )
    }
}

export default Flashcard;