import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Welcome = styled.div`
    margin: 0 auto;
    h2 {
        text-align: center;
        color: red;
        text-decoration: underline
    }
`

const GoLogIn = styled.div`
    width: 50%;
    background-color: rgb(230, 242, 255);
    height: 150px;
    text-align: center;
    margin: 75px auto;
    padding-top: 115px;
    font-size: 33px

`

const HomeButton = styled.div`
    width: 30%;
    text-decoration: none;
    color: #355fa3;
    text-align: center;
    margin: 75px 0;
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
    <Welcome>
        <h2>Welcome to LinguaLect - A Language App</h2>
        <GoLogIn>
             <strong> Login or Sign up, please</strong>
        </GoLogIn>
    </Welcome>
    )
};

export default Home;