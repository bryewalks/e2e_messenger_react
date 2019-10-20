import * as React from 'react'
import axios from 'axios'
import {StyledMessage,
        StyledMessageBox,
        StyledMessageForm,
        StyledButton,
        StyledTextArea,
        StyledDecryptForm,
        StyledDecryptButton,
        StyledDecryptInput,
        MessageDiv,
        StyledWarning,
        Container} from './style'
import * as Cable from 'actioncable'

interface Props {
  conversationId: number
}

interface MessageProps {
  id: number,
  body: string,
  name: string,
  user_id: number
}

const MessageBox: React.FC<Props> = (props) => {
  const [messages, setMessages] = React.useState([] as any[]);
  const [messageBody, setMessageBody] = React.useState('');
  const [messagePassword, setMessagePassword] = React.useState('');
  const [locked, setLocked] = React.useState(true);
  const [chats, setChats] = React.useState({} as any);
  const [error, setError] = React.useState('');
  const currentUser = Number(localStorage.getItem('user_id'))
  
  React.useEffect(() => {
    if (props.conversationId) {
      let cable = Cable.createConsumer(`ws://localhost:3000/api/cable?token=${localStorage.getItem("jwt")}`);
      setChats(cable.subscriptions.create({
        channel: 'MessageChannel',
        conversationId: props.conversationId,
        conversation_password: 'password'
        //@ts-ignore
      }, {
        connected: () => {},
        received: (data: any) => {
          let newData = JSON.parse(data)
          setMessages(messages => [...messages, newData]);
          scrollToBottom();
          setMessageBody('');
        },
        create: function(messageBody: string) {
          this.perform('create', {
            body: messageBody
          });
        }
      }));
      return () => {cable.disconnect();
                    setLocked(true);
                    setMessages([]);
                    setMessageBody('');
                    setError('');
      }
  }}, [props.conversationId]);
  

  const scrollToBottom = () => {
    const messageBody: HTMLElement | null = document.querySelector('#message-box');
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
  }

  const submitMessage = (event: any) => {
    event.preventDefault()
    chats.create(messageBody)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    setError('')
    let params = {
      conversation_password: messagePassword
    }
    axios
      .get(`/api/conversations/${props.conversationId}/messages/`, {params})
      .then(response => {
                          setMessages(response.data)
                          scrollToBottom()
                          setLocked(false)
                        })
      .catch(error => {
        setError('Invalid password.')
      });
  }

  let passwordError;
  if (error) {
    passwordError = <StyledWarning>{error}</StyledWarning>
  }

  let passwordInput;
  if (props.conversationId && locked) {
    passwordInput = <StyledDecryptForm onSubmit={handleSubmit}>
                      <StyledDecryptInput type='password'
                            onChange={e => {setMessagePassword(e.target.value)}}/>
                      <StyledDecryptButton>Decrypt</StyledDecryptButton>
                    </StyledDecryptForm>
                    
  }

  return (
    <Container>
      <StyledMessageBox id="message-box">
        {passwordInput}
        {passwordError}
        <MessageDiv>
          {messages.map((message: MessageProps, index) => {
            return <StyledMessage key={index} currentUser={message.user_id === currentUser}>{message.body}</StyledMessage>})}
        </MessageDiv>
      </StyledMessageBox>
      <StyledMessageForm onSubmit={submitMessage}>
        <StyledTextArea
          disabled={locked}
          value={messageBody}
          onChange={e => { setMessageBody(e.target.value)}}/>
        <StyledButton disabled={locked}>Submit</StyledButton>
      </StyledMessageForm>
    </Container>
  )
}

export default MessageBox