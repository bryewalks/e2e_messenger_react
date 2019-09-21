import * as React from 'react'
import axios from 'axios'
import { Modal, ModalProvider} from '../Modal'
import { StyledList, StyledListItem, StyledButton } from './style'
import { Plus } from 'styled-icons/fa-solid/Plus'

interface Props {
  conversationCallBack: (userId: number) => void
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
  const [conversations, setConversations] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('/api/conversations/')
      .then(response => setConversations(response.data));
  }, []);
  
  return (
    <StyledList>
        {conversations.map((conversation: Conversation, index) => {
          return <StyledListItem onClick={() => props.conversationCallBack(conversation.id)} key={index}> {conversation.receiver.name}</StyledListItem>})}
      <ModalProvider>
        <StyledButton onClick={() => setIsModalOpen(true)}><Plus /></StyledButton>
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <input></input><button>Search People</button><br />
            </Modal>
          )}
      </ModalProvider>
    </StyledList>
  )
}

export default ConversationsList