import React from 'react';
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

const TranslatePage = (props) => {
    return (
        <div>
            <SelectLanguage languages={props.state.languages.all_languages} />
            <TextToTranslate translateText={props.translateText} /><br/>
            <TranslationBox>
                <Translation>
                    <h2>Text translated from {props.state.languages.from_language_name}:</h2>
                    {props.state.languages.textEntered !== null ? <p> {props.state.languages.textEntered}</p> : null}
                </Translation>
                <Translation>
                    <h2>Text translated to {props.state.languages.to_language_name}:</h2>
                    <TranslatedText translatedText={props.state.languages.text_translated}/>
                </Translation>
            </TranslationBox>
        </div>
    );
};

export default TranslatePage;