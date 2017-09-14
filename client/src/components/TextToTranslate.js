import React  from 'react';
import axios from 'axios';
import { parseString } from 'xml2js'
import styled from 'styled-components'

const Button = styled.div`
    width: 30%;
    text-decoration: none;
    color: #355fa3;
    text-align: center;
    margin: 20px 0;
    background-color: rgb(230, 242, 255);
    border-radius: 4px;
    :hover {
        background-color: #355fa3;
        a {
            color: white
        }
    }
    a {
        text-decoration: none;
        display: block
    }
`

const TextToTranslate = (props) => {

    const handleClick = (e) => {
        e.preventDefault();
        props.translateText();
      };

    return (
        <div>
            <form method="get">
                <label>Text to translate:</label> <br/>
                <textarea id="textEntered" name="userText" />
                <Button onClick={handleClick}>Click here to translate</Button>
            </form>
        </div>
    )
}


export default TextToTranslate;