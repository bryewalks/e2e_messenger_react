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

interface User {
  id: number,
  name: string
}

const ConversationsList: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [userSearch, setUserSearch] = React.useState('');
  const [searchedUser, setSearchedUser] = React.useState({} as any);
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
      .then(response => setSearchedUser(response.data))
      .catch(error => {setSearchedUser({})});
  }


  const redirectToLogout = () => {
    props.router.push('/logout')
  }

  const clearSearch = () => {
    setIsModalOpen(false);
    setUserSearch('')
    setSearchedUser({})
  }

  const conversationsCallback = (newConversation: String) => {
    setConversations([...conversations, newConversation]);
    clearSearch()
  }

  let foundUser;
  if (searchedUser.name) {
    foundUser = <UserSearchForm 
                      userName={searchedUser.name} 
                      userId={searchedUser.id} 
                      conversationsCallback={conversationsCallback} />
  }



  return (
    <StyledList>
      <ScrollableDiv>
        {conversations.map((conversation: Conversation, index: number) => {
          return <StyledListItem key={index}
                                 highlighted={highlightedId === conversation.id}
                                 onClick={() => {
                                                  props.conversationCallBack(conversation.id); setHighlightedId(conversation.id)}}>
                                                              {conversation.receiver.name}
                  </StyledListItem>})}
      </ScrollableDiv>
      <ModalProvider>
        <CircleContainer>
          <StyledButton onClick={() => setIsModalOpen(true)}><Plus /></StyledButton>
        </CircleContainer>
          {isModalOpen && (
            <Modal onClose={clearSearch}>
              <form onSubmit={handleSearch}>
                <input placeholder='Search Users'
                      type='search'
                      onChange={e => {setUserSearch(e.target.value)}} />
                <button disabled={userSearch.length === 0}>Search</button>
              </form>
              {foundUser}
            </Modal>
          )}
      </ModalProvider>
      <StyledLogoutButton onClick={() => redirectToLogout()}>Sign Out</StyledLogoutButton>
    </StyledList>
  )
}
export default ConversationsList
