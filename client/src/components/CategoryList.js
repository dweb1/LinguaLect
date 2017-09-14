import React, { Component } from 'react';
import Category from './Category';
import styled from 'styled-components';
import SelectLanguage from './SelectLanguage'

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
        <div>
            <SelectLanguage languages={this.props.state.languages.all_languages} />
            <CatListBox>       
            {this.props.state.categories.map((category) => (
                <Category fetchSpecificCategory={this.props.fetchSpecificCategory} key={category.id} category={category} />
            ))}
            </CatListBox>
        </div>
    )
}
}


export default CategoryList;