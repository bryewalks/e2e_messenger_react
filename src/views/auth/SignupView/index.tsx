import React from 'react'
import AuthForm from 'components/AuthForm'
import { Wrapper } from 'components/Globals'

const SignupView: React.FC = (props: any) => {

  return (
    <Wrapper>
      <AuthForm signup={true}
                router={props.history}>
      </AuthForm>
    </Wrapper>
  )
}

export default SignupView