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

interface User {
  id: number,
  name: string
}

const ConversationsList: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [userSearch, setUserSearch] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [highlightedId, setHighlightedId] = React.useState(0);
  const [conversations, setConversations] = React.useState([] as any);

  React.useEffect(() => {
    axios
      .get('/api/conversations/')
      .then(response => setConversations(response.data));
  }, []);

  const handleSearch = (event: any) => {
    event.preventDefault();
    let params = {
      search: userSearch
    }
    axios
      .get('/api/users/search', {params})
      .then(response => setUsers(response.data));
  }

  const createConversation = (userId: number) => {
    let params = {
      receiver_id: userId
    }

    axios
      .post('/api/conversations', params)
      .then(response => setConversations([...conversations, response.data]))
  }

  return (
    <StyledList>
        {conversations.map((conversation: Conversation, index: number) => {
          return <StyledListItem key={index}
                                 highlighted={highlightedId == conversation.id}
                                 onClick={() => {
                                                  props.conversationCallBack(conversation.id); setHighlightedId(conversation.id)}}>
                                                              {conversation.receiver.name}
                  </StyledListItem>})}
      <ModalProvider>
        <StyledButton onClick={() => setIsModalOpen(true)}><Plus /></StyledButton>
          {isModalOpen && (
            <Modal onClose={() => {setIsModalOpen(false)
                                   setUserSearch('')
                                   setUsers([])}}>
              <form onSubmit={handleSearch}>
                <input placeholder='Search Users'
                      type='search'
                      onChange={e => {setUserSearch(e.target.value)}} />
                <button>Search</button><br />
              </form>
              {users.map((user: User, index: number) => {
                return (<div key={index}>
                          <p>{user.name}<button onClick={() => {createConversation(user.id)
                          }}>+</button></p>
                        </div>)
              })}
            </Modal>
          )}
      </ModalProvider>
    </StyledList>
  )
}

export default ConversationsList