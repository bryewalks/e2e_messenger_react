import * as React from 'react'
import axios from 'axios'
import { StyledList, StyledListItem } from './style'

interface Props {
  chatterCallBack: (userId: number) => void
}

const ConversationsList: React.FC<Props> = (props) => {
  const [conversations, setConversations] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('/api/conversations/')
      .then(response => setConversations(response.data));
  }, []);


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
  
  return (
    <StyledList>
      {conversations.map((conversation: Conversation, index) => {
        return <StyledListItem onClick={() => props.chatterCallBack(conversation.receiver.id)} key={index}>{conversation.receiver.name}</StyledListItem>})}
    </StyledList>
  )
}

export default ConversationsList