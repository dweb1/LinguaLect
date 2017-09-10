import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Category = (props) => {
    return(
        <div>
            <p> {props.category}</p>
        </div>
    )
}

export default Category;