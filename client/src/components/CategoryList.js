import React, { Component } from 'react';
import axios from 'axios';
import Category from './Category';
import styled from 'styled-components';

const CatListBox = styled.div`
    display: flex;
    margin: 20px 5%;
    width: 90%;
    justify-content: space-around;
    flex-wrap: wrap
`

class CategoryList extends Component {

    componentWillMount = () => {
        this.props.fetchCategories();
    }

    render() {

    return (
        <CatListBox>
        {this.props.state.categories.map((category) => (
            <Category fetchSpecificCategory={this.props.fetchSpecificCategory} key={category.id} category={category} />
        ))}
        </CatListBox>
    )
}
}


export default CategoryList;