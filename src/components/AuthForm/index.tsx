import React from 'react';
import axios from 'axios';
import { StyledAuthForm,
         StyledHeader,
         StyledInput,
         StyledButton,
         StyledLink,
         StyledQuestion } from './style';
import { StyledWarning } from 'components/Globals'

interface Props {
  signup: boolean
  router: Router
}

interface Router {
  push: Function
}

const AuthForm: React.FC<Props> = (props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [errors, setErrors] = React.useState([]);

  const handleSignup = (event: any) => {
    event.preventDefault()
    let params = {
      name: username,
      password: password,
      password_confirmation: passwordConfirmation
    };
    axios
      .post("/api/users", params)
      .then(response => {
        props.router.push('/login')
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
    });
  }

  const handleLogin = (event: any) => {
    event.preventDefault()
    let params = {
      name: username,
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

  let linkTo;
  if (props.signup) {
    linkTo = <div>
              <StyledQuestion>Already a member?</StyledQuestion>
              <StyledLink to="/login">Login</StyledLink>
             </div>
  } else {
    linkTo =  <div>
                <StyledQuestion>Not a member?</StyledQuestion>
                <StyledLink to="/signup">Signup</StyledLink>
              </div>
  }

  return (
    <StyledAuthForm onSubmit={props.signup ? handleSignup : handleLogin}>
      <StyledHeader>{props.signup ? "Sign Up" : "Login"}</StyledHeader>
      <StyledInput placeholder='Username'
              onChange={e => {setUsername(e.target.value)}}/>
      <StyledInput placeholder='Password'
              type='password'
              onChange={e => {setPassword(e.target.value)}}/>
      {props.signup && (
        <div>
          <StyledInput placeholder='Password Confirmation'
                  type='password'
                  onChange={e => {setPasswordConfirmation(e.target.value)}}/>
        </div>
      )}
      {linkTo}
      {errors && (
        errors.map((error:any, index) => {
          return <StyledWarning size={'16px'} key={index}>{error}</StyledWarning>
        })
      )}
      <StyledButton>Submit</StyledButton>
    </StyledAuthForm>
  )
}

export default AuthForm