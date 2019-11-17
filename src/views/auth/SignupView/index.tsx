import React from 'react'
import AuthForm from 'components/AuthForm'

const SignupView: React.FC = (props: any) => {

  return (
    <div>
      <AuthForm signup={true}
                router={props.history}>
      </AuthForm>
    </div>
  )
}

export default SignupView