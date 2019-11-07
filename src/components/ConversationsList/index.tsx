import * as React from 'react'
import axios from 'axios'
import { Modal, ModalProvider} from '../Modal'
import UserSearchForm from '../UserSearchForm'
import { StyledList,
         StyledListItem,
         StyledButton,
         StyledLogoutButton,
         ScrollableDiv,
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


const ConversationsList: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [highlightedId, setHighlightedId] = React.useState(0);
  const [conversations, setConversations] = React.useState([] as any);

  React.useEffect(() => {
    axios
      .get('/api/conversations/')
      .then(response => setConversations(response.data));
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
              <UserSearchForm conversationsCallback={conversationsCallback}></UserSearchForm>
            </Modal>
          )}
      </ModalProvider>
      <StyledLogoutButton onClick={() => redirectToLogout()}>Sign Out</StyledLogoutButton>
    </StyledList>
  )
}
export default ConversationsList
