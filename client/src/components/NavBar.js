import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Nav = styled.div`
    color: white;
    display: flex;
    background-color: rgba(53, 95, 163, 1);
    justify-content: space-between
`

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

const Logo = styled.div`
    h1 {
        color:white;
        padding: 15px 15px;
    }
    a {
    text-decoration: none
    }
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 30px;
    span {
        padding-top: 40px;
    }
`

class NavBar extends Component {
    
    // constructor() {
    //     super();
    //     this.state = {
    //       user: {},
    //       loggedIn: false,
    //     }
    // }

    _handleLogOut = (history) => {
        this.props.logOut();
        this.props.history.push('/')
    }

    componentWillMount() {
        this.props.isLoggedIn();
      }
    
    
    componentWillReceiveProps(nextState) {
        this.props.isLoggedIn();
    }

  render() {
    if (this.props.state.loggedIn) {
      return (
        <Nav>
        <Logo>
          <Link to="/">
              <h1>LinguaLect</h1>
          </Link>
        </Logo>
        <Buttons>
            <span>Signed In As: {this.props.state.user.email}</span>
            <NavButton>
            <a href="/" onClick={this._handleLogOut}> Log Out </a>
            </NavButton>
        </Buttons>
        </Nav>
      );
    }
    return (
      <Nav>
        <Logo>
            <Link to="/">
                <h1>LinguaLect</h1>
            </Link>
        </Logo>
        <Buttons>
            <NavButton>
                <Link to="/signup">Sign Up</Link>
            </NavButton>
            <NavButton>
                <Link to="/signin">Sign In</Link>
            </NavButton>
        </Buttons>
      </Nav>
    );
  }
}

export default withRouter(NavBar);