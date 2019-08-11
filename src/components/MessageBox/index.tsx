import * as React from 'react'
import axios from 'axios'
import { StyledMessageBox, StyledMessageForm, StyledButton, StyledTextArea } from './style'

const MessageBox: React.FC = () => {

  return (
    <div>
      <StyledMessageBox />
      <StyledMessageForm>
        <StyledTextArea></StyledTextArea>
        <StyledButton>Submit</StyledButton>
      </StyledMessageForm>
    </div>
  )
}

export default MessageBox