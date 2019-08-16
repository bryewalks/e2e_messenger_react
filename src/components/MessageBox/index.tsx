import * as React from 'react'
import axios from 'axios'
import { StyledMessage, StyledMessageBox, StyledMessageForm, StyledButton, StyledTextArea, Container } from './style'

const MessageBox: React.FC = () => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('/api/messages/', {params: {conversation_id: 3}})
      .then(response => setMessages(response.data));
  }, []);

  interface MessageProps {
    id: number,
    body: string,
    name: string,
    current_user: boolean
  }

  return (
    <div>
      <StyledMessageBox>
   
          {messages.map((message: MessageProps, index) => {
            return <StyledMessage>{message.body}</StyledMessage>})}
    
      </StyledMessageBox>
      <StyledMessageForm>
        <StyledTextArea></StyledTextArea>
        <StyledButton>Submit</StyledButton>
      </StyledMessageForm>
    </div>
  )
}

export default MessageBox