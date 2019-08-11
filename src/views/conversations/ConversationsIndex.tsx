import * as React from 'react'
import axios from 'axios'
import ConversationsList from 'components/ConversationsList'
import MessageBox from 'components/MessageBox'

const ConversationsIndex: React.FC = () => {

  interface ConversationUser {
    id: number,
    name: string,
    email: string
  }

  interface ConversationMessage {
    id: number,
    name: string,
    body: string
  }

  interface Conversation {
    id: number,
    created_at: string,
    author: ConversationUser,
    receiver: ConversationUser,
    messages: ConversationMessage[]
  }

  return (
    <div>
      <ConversationsList />
      <MessageBox />
    </div>
  )
}

export default ConversationsIndex