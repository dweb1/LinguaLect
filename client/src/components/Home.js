import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";


const HomeButton = styled.div`
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
const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px 30px;
`

const Home = (props) => {
    if (props.state.user.email) {
    return (
        <Buttons>
              <HomeButton>
                <Link to="/translate"><p>Translate</p></Link>
              </HomeButton>
              <HomeButton>
                <Link to="/categories"><p>Flashcard</p></Link>
              </HomeButton>
        </Buttons>
    );
}
 return (
    <div>
        <p> Login or Sign up, please</p>
    </div>
    )
};

export default Home;