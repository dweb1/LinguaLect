import React, { Component } from 'react';
import TextToTranslate from './TextToTranslate'
import TranslatedText from './TranslatedText'
import SelectLanguage from './SelectLanguage'
import styled from 'styled-components'

const TranslationBox = styled.div`
    display: flex;
    justify-content: center
`

const Translation = styled.div`
    width: 30%;
    background-color: rgb(230, 242, 255);
    border-radius: 4px;
    margin: 20px 10px;
`

class TranslatePage extends Component {

    componentWillMount = () => {
        this.props.loadData();
    }
    render() {
    return (
        <div>
            <SelectLanguage languageFrom={this.props.languageFrom} languageTo={this.props.languageTo} languages={this.props.state.languages.all_languages} />
            <TextToTranslate translateText={this.props.translateText} /><br/>
            <TranslationBox>
                <Translation>
                    <h2>Text translated from {this.props.state.languages.from_language_name}:</h2>
                    {this.props.state.languages.textEntered !== null ? <p> {this.props.state.languages.textEntered}</p> : null}
                </Translation>
                <Translation>
                    <h2>Text translated to {this.props.state.languages.to_language_name}:</h2>
                    <TranslatedText translatedText={this.props.state.languages.text_translated}/>
                </Translation>
            </TranslationBox>
        </div>
    );
}
}

export default TranslatePage;