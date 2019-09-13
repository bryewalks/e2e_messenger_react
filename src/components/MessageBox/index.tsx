import * as React from 'react'
import axios from 'axios'
import {StyledMessage,
        StyledMessageBox,
        StyledMessageForm,
        StyledButton,
        StyledTextArea,
        MessageDiv,
        Container} from './style'
import Cable from 'actioncable'

interface Props {
  conversationId: number
}

interface MessageProps {
  id: number,
  body: string,
  name: string,
  user_id: string
}

const MessageBox: React.FC<Props> = (props) => {
  const [messages, setMessages] = React.useState([] as any[]);
  const [messageBody, setMessageBody] = React.useState('');
  const [chats, setChats] = React.useState({} as any);
  const currentUser = localStorage.getItem('user_id')
  console.log(currentUser)
  
    React.useEffect(() => {
    if (props.conversationId) {
      let cable = createSocket()
      axios
        .get(`/api/conversations/${props.conversationId}/messages/`)
        .then(response => {
                            setMessages(response.data)
                            scrollToBottom()});
      return () => cable.disconnect();
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

  function createSocket() {
    let cable = Cable.createConsumer(`ws://localhost:3000/api/cable?token=${localStorage.getItem("jwt")}`);
    // @ts-ignore
    setChats(cable.subscriptions.create({
      channel: 'MessageChannel'
    // @ts-ignore
    }, {
      connected: () => {},
      received: (data) => {
        let newData = JSON.parse(data)
        setMessages(messages => [...messages, newData]);
        scrollToBottom();
        setMessageBody('');
      },
      create: function(messageContent: any) {
        this.perform('create', {
          body: messageContent,
          conversation_id: props.conversationId,
        });
      }
    }));
    return cable
  }

  return (
    <Container>
      <StyledMessageBox id="message-box">
        <MessageDiv>
          {messages.map((message: MessageProps, index) => {
            return <StyledMessage key={index} currentUser={message.user_id == currentUser}>{message.body}</StyledMessage>})}
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