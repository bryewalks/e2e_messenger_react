import * as React from 'react'
import axios from 'axios'
import {StyledMessage,
        StyledMessageBox,
        StyledMessageForm,
        StyledButton,
        StyledTextArea,
        MessageDiv,
        Container} from './style'

interface Props {
  conversationId: number
}

interface MessageProps {
  id: number,
  body: string,
  name: string,
  current_user: boolean
}

const MessageBox: React.FC<Props> = (props) => {
  const [messages, setMessages] = React.useState([] as any[]);
  const [messageBody, setMessageBody] = React.useState('');
  
    React.useEffect(() => {
    if (props.conversationId) {
      axios
        .get(`/api/conversations/${props.conversationId}/messages/`)
        .then(response => {
                            setMessages(response.data)
                            scrollToBottom()});
    }}, [props.conversationId]);
  

  const scrollToBottom = () => {
    const messageBody: HTMLElement | null = document.querySelector('#message-box');
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
  }

  const submitMessage = (event: any) => {
    event.preventDefault()
    var formData = {
      body: messageBody
    }
    axios
    .post(`/api/conversations/${props.conversationId}/messages/`, formData)
    .then(response => {
                        setMessages([...messages, response.data]);
                        scrollToBottom();
                        setMessageBody('');
                      });
  }

  return (
    <Container>
      <StyledMessageBox id="message-box">
        <MessageDiv>
          {messages.map((message: MessageProps, index) => {
            return <StyledMessage key={index} currentUser={message.current_user}>{message.body}</StyledMessage>})}
        </MessageDiv>
      </StyledMessageBox>
      <StyledMessageForm onSubmit={submitMessage}>
        <StyledTextArea
          value={messageBody}
          onChange={e => { setMessageBody(e.target.value)}}/>
        <StyledButton>Submit</StyledButton>
      </StyledMessageForm>
    </Container>
  )
}

export default MessageBox