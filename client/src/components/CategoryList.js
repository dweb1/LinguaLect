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
    constructor(){
        super();
        this.state = {
            categories: []
        }
    }

    componentWillMount() {
        this._fetchCategories();
    }
    
    _fetchCategories = async () => {
        try {
            const res = await axios.get('/api/categories');
            const categories = res.data;
            this.setState({categories});
        } catch (error) {
            this.setState({error});
        }
    }

    render () {
        return (
            <CatListBox>
            {this.state.categories.map((category) => (
                <Category key={category.id} category={category} />

            ))}
            </CatListBox>
        )
    }
}

export default CategoryList;