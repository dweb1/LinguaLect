import React from 'react';

const TranslatedText = (props) => {
    return (
        <div>
            {props.translatedText !== null ? <p> {props.translatedText}</p> : <p>Your translated text will appear here</p>}
        </div>
    );
};

export default TranslatedText;