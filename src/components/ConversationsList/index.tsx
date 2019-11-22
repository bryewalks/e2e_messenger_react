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
         CircleContainer } from './style'
import { Plus } from 'styled-icons/fa-solid/Plus'

interface Props {
  conversationCallBack: (userId: number) => void
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
  author: ConversationUser,
  receiver: ConversationUser,
}

interface CreateConversation {
  receiverId: string,
  password: string,
  passwordConfirmation: string,
}


const ConversationsList: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [highlightedId, setHighlightedId] = React.useState(0);
  const [conversations, setConversations] = React.useState([] as any[]);
  const [conversationsCable, setConversationsCable] = React.useState({} as any);

  

  React.useEffect(() => {
    axios
      .get('/api/conversations/')
      .then(response => setConversations(response.data));

    let cable = Cable.createConsumer(`ws://localhost:3000/api/cable?token=${localStorage.getItem("jwt")}`);
    setConversationsCable(cable.subscriptions.create({
      channel: 'ConversationChannel'
      //@ts-ignore
    }, {
      connected: () => {},
      received: (data: any) => {
        let newData = JSON.parse(data)
        console.log(newData)
        setConversations(conversations => [...conversations, newData]);
        setIsModalOpen(false);
      },
      create: function(options: CreateConversation) {
        this.perform('create', {
          receiver_id: options.receiverId,
          password: options.password,
          password_confirmation: options.passwordConfirmation
        });
      }
    }));
    // return () => {cable.disconnect()}
  }, []);

  const redirectToLogout = () => {
    props.router.push('/logout')
  }

  const conversationsCallback = (newConversation: String) => {
    setConversations([...conversations, newConversation]);
    setIsModalOpen(false);
  }

  return (
    <StyledList>
      <ScrollableDiv>
        {conversations.length === 0 && (
          <StyledPTag>No active conversations...</StyledPTag>
        )}
        {conversations.map((conversation: Conversation, index: number) => {
          return <StyledListItem key={index}
                                 highlighted={highlightedId === conversation.id}
                                 onClick={() => {
                                                  props.conversationCallBack(conversation.id)
                                                  setHighlightedId(conversation.id)}}>
                    {conversation.receiver.name}
                  </StyledListItem>})}
      </ScrollableDiv>
      <ModalProvider>
        <CircleContainer>
          <StyledButton onClick={() => setIsModalOpen(true)}><Plus /></StyledButton>
        </CircleContainer>
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <UserSearchForm cable={conversationsCable} conversationsCallback={conversationsCallback}></UserSearchForm>
            </Modal>
          )}
      </ModalProvider>
      {conversations.length === 0 && (
        <StyledPTag>Add users to start encrypted chats.</StyledPTag>
      )}
      <StyledLogoutButton onClick={() => redirectToLogout()}>Sign Out</StyledLogoutButton>
    </StyledList>
  )
}
export default ConversationsList
