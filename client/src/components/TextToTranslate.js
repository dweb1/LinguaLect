import React  from 'react';
import axios from 'axios';
import { parseString } from 'xml2js'

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
                <div onClick={handleClick}>Click here to translate</div>
            </form>
        </div>
    )
}


export default TextToTranslate;