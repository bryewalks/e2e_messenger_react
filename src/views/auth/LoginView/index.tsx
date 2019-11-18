import React from 'react'
import AuthForm from 'components/AuthForm'
import { Wrapper } from 'components/Globals'

const LoginView: React.FC = (props: any) => {
  return (
    <Wrapper>
      <AuthForm signup={false}
                router={props.history}/>
    </Wrapper>
  )
}

export default LoginView