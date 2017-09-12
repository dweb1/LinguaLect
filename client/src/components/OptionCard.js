import React from 'react';
import styled from 'styled-components';

const OptionBox = styled.div`
    width: 30%;
    text-decoration: none;
    color: #355fa3;
    margin: 20px 0;
    box-shadow: 1px 1px 5px black;
    :hover {
        background-color: #355fa3;
        p {
            color: white
        }
    }
    a {
        text-decoration: none;
        display: block
    }
`


const OptionCard = (props) => {
    return (
        <OptionBox>
        <p>{props.word}</p>
        </OptionBox>
    );
};

export default OptionCard;