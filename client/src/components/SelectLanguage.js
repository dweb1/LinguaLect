import React from 'react';
import styled from 'styled-components'


const LanguageBox = styled.div`
    display: flex;
    justify-content: center
`

const IndivLangSelect = styled.div`
    width: 30%;
    background-color: rgb(230, 242, 255);    
    border-radius: 4px; 
    margin: 20px 10px;
    text-align: center;    
`

const SelectLanguage = (props) => {
    return (
        <LanguageBox>
            <IndivLangSelect>
                <h3>Language to translate from:</h3>
                <select>
                    {props.languages.map((language, index) => {
                        return <option key={index} value={language.language_name}>{language.language_name}</option>
                    })}
                </select>
            </IndivLangSelect>
            <IndivLangSelect>
                <h3>Language to translate to:</h3>
                <select>
                    {props.languages.map((language, index) => {
                        return <option key={index} value={language.language_name}>{language.language_name}</option>
                    })}
                </select>
            </IndivLangSelect>
        </LanguageBox>
    );
};

export default SelectLanguage;