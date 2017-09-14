import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";


const NavButton = styled.div`
background-color: white;
text-decoration: none;
color: #355fa3;
margin: 20px 15px;
padding: 15px 15px;
border-radius: 4px;
:hover {
  background-color: rgb(0, 72, 156);
    a {
        color: white
    }
}
a {
    text-decoration: none;
    display: block
}
`
const Buttons = styled.div`
display: flex;
justify-content: space-between;
margin: 10px 30px;
`

const Home = () => {
    return (
        <Buttons>
              <NavButton>
                <Link to="/translate">Translate</Link>
              </NavButton>
              <NavButton>
                <Link to="/categories">Flashcard</Link>
              </NavButton>
        </Buttons>
    );
};

export default Home;