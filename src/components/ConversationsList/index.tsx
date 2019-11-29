import * as React from 'react'
import axios from 'axios'
import * as Cable from 'actioncable'
import { Modal, ModalProvider} from '../Modal'
import UserSearchForm from '../UserSearchForm'
import { StyledList,
         StyledListItem,
         StyledButton,
         StyledLogoutButton,
         ScrollableDiv,
         StyledPTag,
         CircleContainer,
         OnlineStatus } from './style'
import { Plus } from 'styled-icons/fa-solid/Plus'

interface Props {
  conversationIdCallBack: (userId: number) => void
  router: Router
}

interface Router {
  push: Function
}

interface ConversationUser {
  id: number,
  name: string,
  email: string
}

interface Conversation {
  id: number,
  created_at: string,
  unread_messages: boolean,
  author: ConversationUser,
  receiver: ConversationUser
}

interface NewConversation {
  receiverId: number,
  password: string,
  passwordConfirmation: string
}

const ConversationsList: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [highlightedId, setHighlightedId] = React.useState(0);
  const [conversations, setConversations] = React.useState([] as any[]);
  const [conversationsCable, setConversationsCable] = React.useState({} as any);
  const [alertedConversations, setAlertedConversations] = React.useState([] as any[]);
  const currentUserId = Number(localStorage.getItem('user_id'))
  
  React.useEffect(() => {
    axios
      .get('/api/conversations/')
      .then(response => {
                          setConversations(response.data)
                          setLoading(false)
                        });

    let cable = Cable.createConsumer(`ws://localhost:3000/api/cable?token=${localStorage.getItem("jwt")}`);
    setConversationsCable(cable.subscriptions.create({
      channel: 'ConversationChannel'
      // @ts-ignore
    }, {
      connected: () => {},
      received: (data: any) => {
        let receivedConversation = JSON.parse(data)
        switch (receivedConversation.action) {
          case 'new conversation':
            setConversations(conversations => [...conversations, receivedConversation]);
            break;
          case 'conversation alert':
            setAlertedConversations(alertedConversations => [...alertedConversations, receivedConversation.id]);
        }
      },
      alert: function(inputId: number) {
        this.perform('alert', {
          id: inputId,
        });
      },
      create: function(newConversation: NewConversation) {
        this.perform('create', {
          receiver_id: newConversation.receiverId,
          password: newConversation.password,
          password_confirmation: newConversation.passwordConfirmation
        });
      }
    }));
  }, []);

  const redirectToLogout = () => {
    props.router.push('/logout')
  }

  let noActiveConversations = conversations.length === 0 && !loading
  

  const removeAlertedConversation = (conversationId: number) => {
    const filteredAlerts = alertedConversations.filter(alertedConversation => alertedConversation !== conversationId)
    setAlertedConversations(filteredAlerts)
  }

  const conversationCreateCallback = (newConversation: NewConversation) => {
    axios
      .post('/api/conversations', newConversation)
      .then(response => {setConversations([...conversations, response.data]);})
      .catch(error => {});
    setIsModalOpen(false);
  }

  return (
    <StyledList>
      <ScrollableDiv>
        {noActiveConversations && (
          <StyledPTag>No active conversations...</StyledPTag>
        )}
        {conversations.map((conversation: Conversation, index: number) => {
          return <div key={index}>
                   <StyledListItem 
                                 highlighted={highlightedId === conversation.id}
                                 alert={alertedConversations.includes(conversation.id) || conversation.unread_messages}
                                 onClick={() => {
                                                  props.conversationIdCallBack(conversation.id)
                                                  setHighlightedId(conversation.id)
                                                  conversation.unread_messages = false;
                                                  removeAlertedConversation(conversation.id)
                                                  }}>
                    <OnlineStatus></OnlineStatus>
                    {currentUserId === conversation.author.id ? conversation.receiver.name : conversation.author.name }
                   </StyledListItem>
                 </div>})}
      </ScrollableDiv>
      <ModalProvider>
        <CircleContainer>
          <StyledButton onClick={() => setIsModalOpen(true)}><Plus /></StyledButton>
        </CircleContainer>
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <UserSearchForm cable={conversationsCable} conversationCreateCallback={conversationCreateCallback}></UserSearchForm>
            </Modal>
          )}
      </ModalProvider>
      {noActiveConversations && (
        <StyledPTag>Add users to start encrypted chats.</StyledPTag>
      )}
      <StyledLogoutButton onClick={() => redirectToLogout()}>Sign Out</StyledLogoutButton>
    </StyledList>
  )
}
export default ConversationsList
