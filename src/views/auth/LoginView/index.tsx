import * as React from 'react'
import LoginForm from 'components/LoginForm'

// interface LoginViewProps {
//   name: string;
// }

const LoginView: React.FC = (props: any) => {
  return (
    <div>
      <LoginForm router={props.history}/>  
    </div>
  )
}

export default LoginView