import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components'

const CatCard = styled.div`
    width: 30%;
    color: #355fa3;
    margin: 20px 0;
    box-shadow: 1px 1px 5px black;
    :hover {
        background-color: #355fa3;
        color: white 
    }
    :a:link {
        text-decoration: none 
        
    }
`

const Category = (props) => {
    return(
        <CatCard>
            <Link to={`/categories/${props.category.id}/flashcards`} >
            <p> {props.category.name}</p>
            </Link>
        </CatCard>
    )
}

export default Category;