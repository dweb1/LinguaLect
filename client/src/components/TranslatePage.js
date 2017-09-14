import React from 'react';
import TextToTranslate from './TextToTranslate'
import TranslatedText from './TranslatedText'

const TranslatePage = (props) => {
    return (
        <div>
            <TextToTranslate translateText={props.translateText} />
            <h2>Text translated from {props.state.languages.from_language_name}:</h2>
            {props.state.languages.textEntered !== null ? <p> {props.state.languages.textEntered}</p> : null}
            <h2>Text translated to {props.state.languages.to_language_name}:</h2>
            <TranslatedText translatedText={props.state.languages.text_translated}/>
        </div>
    );
};

export default TranslatePage;