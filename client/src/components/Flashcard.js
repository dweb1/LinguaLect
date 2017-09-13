import React, { Component } from "react";
import OptionCard from './OptionCard';
import styled from 'styled-components'

const OptionBox = styled.div`
    display: flex;
    margin: 20px 5%;
    width: 90%;
    justify-content: space-around;
    flex-wrap: wrap
`

const WordToGuess = styled.div`
    width: 30%;
    text-align: center;
    text-decoration: none;
    background-color: red;
    color: white;
    margin: 20px 0;
    border-radius: 4px;    
    margin: 0 auto
`

class Flashcard extends Component {
    
    componentWillMount = async () => {
        await this.props.fetchCategories();
        await this.props.fetchData();
        this.props.translateWord();
    }
    render(){
        return (
        <div>
            <WordToGuess>
                <h5>YOUR WORD IS:</h5>
                <p>{this.props.state.flashcard.translated_main_word}</p>
            </WordToGuess>
            <OptionBox>
            {this.props.state.flashcard.options.map((option, index) => {
               return <OptionCard key={index} id={index} word={option.word}/>
            })}
            </OptionBox>
        </div>
        )
}
}

export default Flashcard;