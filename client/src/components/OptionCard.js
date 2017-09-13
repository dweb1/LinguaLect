import React from 'react';
import styled from 'styled-components';

const OptionBox = styled.div`
    width: 30%;
    text-decoration: none;
    color: #355fa3;
    margin: 20px 0;
    text-align: center;
    background-color: rgb(230, 242, 255);
    border-radius: 4px;
    :hover {
        background-color: #355fa3;
        p {
            color: white
        }
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