import React from 'react';

const SelectLanguage = (props) => {
    return (
        <div>
            <select>
                {props.categories.map((category, index) => {
                    return <option key={index} value={category.name}>{category.name}</option>
                })}
            </select>
        </div>
    );
};

export default SelectLanguage;