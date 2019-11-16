import * as React from 'react'
import axios from 'axios';

const SignupView: React.FC = (props: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [name, setName] = React.useState('');
  const [errors, setErrors] = React.useState('');

  const handleSubmit = (event: any) => {
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
        console.log('User Created!')
      })
      .catch((error) => {
        console.log(error.response.data.errors)
        setErrors(error.response.data.errors);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='Name'
               onChange={e => {setName(e.target.value)}}/>
        <input placeholder='Email'
               type='email'
               onChange={e => {setEmail(e.target.value)}}/>
        <input placeholder='Password'
               type='password'
               onChange={e => {setPassword(e.target.value)}}/>
        <input placeholder='Password Confirmation'
               type='password'
               onChange={e => {setPasswordConfirmation(e.target.value)}}/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SignupView