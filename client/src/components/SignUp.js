import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {setAxiosHeaders} from '../util'
import styled from 'styled-components'

const Form = styled.div`
width: 40%;
background-color: rgb(230, 242, 255);
border-radius: 4px;
margin: 20px auto;
padding: 5px;
height: 225px;
align: center;
padding-top: 30px;
p {
  text-align: center;
  text-decoration: underline;
  font-weight: 700;
  
}
`

const EntryField = styled.div`
  padding: 15px 0;
  text-align: center
`

class SignUp extends Component {
 constructor(){
   super();
   this.state = {
       email: '',
       password: '',
       password_confirmation: '',
       redirect: false
   }
 }

 _signUp = async (e) => {
  e.preventDefault();
  const payload = {
    email: this.state.email,
    password: this.state.password,
    password_confirmation: this.state.password_confirmation
  }
  const response = await axios.post('/auth', payload)
  setAxiosHeaders(response.headers)
  this.setState({redirect: true})
}

 _signIn = (e) => {
   e.preventDefault();
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
       <form onSubmit={this._signUp}>
         <p>Please sign up to use LinguaLect</p>
         <EntryField>
           <label htmlFor="email">E-mail: </label>
           <input onChange={this._handleChange} type="text" name="email" value={this.state.email} />
         </EntryField>
         <EntryField>
           <label htmlFor="password">Password: </label>
           <input onChange={this._handleChange} type="text" name="password" value={this.state.password} />
         </EntryField>
         <EntryField>
           <label htmlFor="password">Confirm Password: </label>
           <input onChange={this._handleChange} type="text" name="password_confirmation" value={this.state.password_confirmation} />
         </EntryField>
         
         <button>Sign Up</button>
         <button onClick={this._signIn}>Log In</button>
       </form>
     </Form>
   );
 }
}

export default SignUp;