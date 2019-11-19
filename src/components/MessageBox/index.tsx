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
        Container} from './style'
import { Loader, StyledWarning } from 'components/Globals'
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
  const [decrypting, setDecrypting] = React.useState(false);
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
                    setMessagePassword('');
                    setError('');
      }
  }}, [props.conversationId]);
  

  const scrollToBottom = () => {
    const messageBody: HTMLElement | null = document.querySelector('#message-box');
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
  }

  const onEnterPress = (event: any) => {
    if(event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      submitMessage(event);
    }
  }

  const submitMessage = (event: any) => {
    event.preventDefault()
    if (messageBody) {
      chats.create(messageBody)
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (!messagePassword) {
      setError('field cannot be empty')
    } else {
      setDecrypting(true)
      let params = {
        conversation_password: messagePassword
      }
      axios
        .get(`/api/conversations/${props.conversationId}/messages/`, {params})
        .then(response => {
                            setMessages(response.data)
                            scrollToBottom()
                            setLocked(false)
                            setDecrypting(false)
                            setError('')
                          })
        .catch(error => {
          setError(error.response.data.errors)
          setDecrypting(false)
        });
    }
  }

  let passwordError;
  if (error) {
    passwordError = <StyledWarning size={'24px'} >{error}</StyledWarning>
  }

  let passwordInput;
  if (props.conversationId && locked) {
    passwordInput = <StyledDecryptForm onSubmit={handleSubmit}>
                      <StyledDecryptInput key ={props.conversationId}
                                          type='password'
                                          hidden={decrypting}
                            onChange={e => {setMessagePassword(e.target.value)}}/>
                      <Loader hidden={!decrypting}/>
                      <StyledDecryptButton>{decrypting ? 'Decrypting' : 'Decrypt'}</StyledDecryptButton>
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
          onKeyDown={onEnterPress}
          disabled={locked}
          value={messageBody}
          onChange={e => { setMessageBody(e.target.value)}}/>
        <StyledButton disabled={locked}>Submit</StyledButton>
      </StyledMessageForm>
    </Container>
  )
}

export default MessageBox