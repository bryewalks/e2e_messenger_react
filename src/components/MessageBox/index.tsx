import * as React from 'react'
import axios from 'axios'
import {StyledMessage,
        StyledMessageBox,
        StyledMessageForm,
        StyledButton,
        StyledTextArea,
        Container} from './style'

interface Props {
  chatterId: number
}

interface MessageProps {
  id: number,
  body: string,
  name: string,
  current_user: boolean
}

const MessageBox: React.FC<Props> = (props) => {
  const [messages, setMessages] = React.useState([]);
  
  React.useEffect(() => {
    axios
      .get('/api/messages/', {params: {conversation_id: props.chatterId}})
      .then(response => {
                          setMessages(response.data)
                          scrollToBottom()});
  }, [props.chatterId]);

  const scrollToBottom = () => {
    const messageBody: HTMLElement | null = document.querySelector('#message-box');
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
  }

  return (
    <Container>
      <StyledMessageBox id="message-box">
   
          {messages.map((message: MessageProps, index) => {
            return <StyledMessage key={index} currentUser={message.current_user}>{message.body}</StyledMessage>})}
    
      </StyledMessageBox>
      <StyledMessageForm>
        <StyledTextArea></StyledTextArea>
        <StyledButton>Submit</StyledButton>
      </StyledMessageForm>
    </Container>
  )
}

export default MessageBox