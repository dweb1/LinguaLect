import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { setAxiosHeaders } from '../util';
import styled from 'styled-components'

const Form = styled.div`
  width: 30%;
  background-color: rgb(230, 242, 255);
  border-radius: 4px;
  margin: 20px auto;
  padding: 5px;
  height: 200px;
  align: center;
  padding-top: 45px;
  p {
    text-align: center;
    text-decoration: underline;
    font-weight: 700;
    
  }
`

const EntryField = styled.div`
padding: 15px 0;
`

class SignIn extends Component {
 constructor(){
   super();
   this.state = {
       email: '',
       password: '',
       password_confirmation: '',
       redirect: false
   }
 }

 _signIn = async (e) => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
    }
    const response = await axios.post('/auth/sign_in', payload);
    setAxiosHeaders(response.headers);
    console.log(response)
    // res.data.data
    this.props.addUserToState(response);
    this.setState({redirect: true})
  }
  
   _handleChange = (e) => {
     const newState = {...this.state};
     newState[e.target.name] = e.target.value;
     this.setState(newState);
   }
  
   render() {
     if (this.state.redirect){
       return <Redirect to="/" />
     }
     return (
       <Form>
         <form onSubmit={this._signIn}>
           <p>Please sign in</p>
           <EntryField>
             <label htmlFor="email">E-mail: </label>
             <input onChange={this._handleChange} type="text" name="email" value={this.state.email} />
           </EntryField>
           <EntryField>
             <label htmlFor="password">Password: </label>
             <input onChange={this._handleChange} type="password" name="password" value={this.state.password} />
           </EntryField>
           <button>Sign In</button>
           <Link to="/signup">Sign Up</Link>
         </form>
       </Form>
     );
   }
  }
  
  export default SignIn;