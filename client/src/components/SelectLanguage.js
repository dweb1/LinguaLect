import React from 'react';

const SelectLanguage = (props) => {
    return (
        <div>
            <h3>Language to translate from:</h3>
            <select>
                {props.languages.map((language, index) => {
                    return <option key={index} value={language.language_name}>{language.language_name}</option>
                })}
            </select>
            <h3>Language to translate to:</h3>
            <select>
                {props.languages.map((language, index) => {
                    return <option key={index} value={language.language_name}>{language.language_name}</option>
                })}
            </select>
        </div>
    );
};

export default SelectLanguage;