import React from 'react';
import axios from 'axios';
import { StyledAuthForm,
         StyledHeader,
         StyledInput,
         StyledButton } from './style';

interface Props {
  signup: boolean
  router: Router
}

interface Router {
  push: Function
}

const AuthForm: React.FC<Props> = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [name, setName] = React.useState('');
  const [errors, setErrors] = React.useState('');

  const handleSignup = (event: any) => {
    event.preventDefault()
    let params = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      name: name
    };
    axios
      .post("/api/users", params)
      .then(response => {
        props.router.push('/login')
      })
      .catch((error) => {
        console.log(error.response.data.errors)
        setErrors(error.response.data.errors);
    });
  }

  const handleLogin = (event: any) => {
    event.preventDefault()
    let params = {
      email: email,
      password: password
    };
    axios
      .post("/api/sessions", params)
      .then(response => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        props.router.push('/conversations')
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        setPassword('');
      });
  }


  return (
    <StyledAuthForm onSubmit={props.signup ? handleSignup : handleLogin}>
      <StyledHeader>{props.signup ? "Sign Up" : "Login"}</StyledHeader>
      <StyledInput placeholder='Email'
              type='email'
              onChange={e => {setEmail(e.target.value)}}/>
      <StyledInput placeholder='Password'
              type='password'
              onChange={e => {setPassword(e.target.value)}}/>
      {props.signup && (
        <div>
          <StyledInput placeholder='Password Confirmation'
                  type='password'
                  onChange={e => {setPasswordConfirmation(e.target.value)}}/>
          <StyledInput placeholder='Name'
                  onChange={e => {setName(e.target.value)}}/>
        </div>
      )}
      <StyledButton>Submit</StyledButton>
    </StyledAuthForm>
  )
}

export default AuthForm