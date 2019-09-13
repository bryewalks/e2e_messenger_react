import * as React from 'react'
import axios from 'axios'
import {StyledMessage,
        StyledMessageBox,
        StyledMessageForm,
        StyledButton,
        StyledTextArea,
        MessageDiv,
        Container} from './style'
// import { createSocket } from 'dgram';
import Cable from 'actioncable'

interface Props {
  conversationId: number
}

interface MessageProps {
  id: number,
  body: string,
  name: string,
  user: string
}

const MessageBox: React.FC<Props> = (props) => {
  const [messages, setMessages] = React.useState([] as any[]);
  const [messageBody, setMessageBody] = React.useState('');
  const [chats, setChats] = React.useState({} as any);
  const [currentUser] = React.useState(localStorage.getItem("user"))
  
    React.useEffect(() => {
    if (props.conversationId) {
      createSocket()
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
    chats.create(messageBody)
    // setMessages([...messages, messageBody]);
    // scrollToBottom();
    // setMessageBody('');
    // var formData = {
    //   body: messageBody
    // }
    // axios
    // .post(`/api/conversations/${props.conversationId}/messages/`, formData)
    // .then(response => {
    //                     setMessages([...messages, response.data]);
    //                     scrollToBottom();
    //                     setMessageBody('');
    //                   });
  }

  function createSocket() {
    let cable = Cable.createConsumer(`ws://localhost:3000/api/cable`);
    // @ts-ignore
    setChats(cable.subscriptions.create({
      channel: 'MessageChannel'
    // @ts-ignore
    }, {
      connected: () => {},
      received: (data) => {
        setMessages(messages => [...messages, data]);
        scrollToBottom();
        setMessageBody('');
      },
      create: function(messageContent: any) {
        this.perform('create', {
          body: messageContent,
          conversation_id: props.conversationId,
          user_id: currentUser
        });
      }
    }));
  }


  // console.log(messages);
  console.log(messages);
  

  return (
    <Container>
      <StyledMessageBox id="message-box">
        <MessageDiv>
          {messages.map((message: MessageProps, index) => {
            return <StyledMessage key={index} currentUser={message.user == currentUser}>{message.body}</StyledMessage>})}
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