import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Category = (props) => {
    render(
        <div>
            <p> {props.name}</p>
        </div>
    )
}

export default Category;