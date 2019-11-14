import React, { useState } from 'react'
import axios from 'axios'
import { Wrapper } from 'components/Globals'
import { StyledForm, StyledButton, StyledInput } from './style'

interface Props {
  router: Router
}

interface Router {
  push: Function
}

const LoginForm:React.FC<Props> = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = (event: any) => {
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
        setError(error.response.data.errors);
        setPassword('');
      });
  }

  let logError
  if (error) {
    logError = <p>*{error}</p>
  }
  
  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput placeholder="Email"
              type="email" 
              onChange={e => {setEmail(e.target.value)}} />
        <br />
        <StyledInput placeholder="Password" 
              type="password"
              onChange={e => {setPassword(e.target.value)}} />
        <br />
        <StyledButton>Login</StyledButton>
        {logError}
      </StyledForm>
    </Wrapper>
  )
}

export default LoginForm