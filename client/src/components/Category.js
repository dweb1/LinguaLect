import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'

const CatCard = styled.div`
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