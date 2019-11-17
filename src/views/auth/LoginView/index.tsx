import React from 'react'
import AuthForm from 'components/AuthForm'
import { Link } from 'react-router-dom'

const LoginView: React.FC = (props: any) => {
  return (
    <div>
      <AuthForm signup={false}
                router={props.history}/>
      <Link to="/signup">Signup</Link>
    </div>
  )
}

export default LoginView