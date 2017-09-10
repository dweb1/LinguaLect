import React, { Component } from 'react';
import axios from 'axios';
import Category from './Category';
import styled from 'styled-components';

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
            <div>
            {this.state.categories.map((category) => (
                <Category key={category.id} category={category.name} />

            ))}
            </div>
        )
    }
}

export default CategoryList;