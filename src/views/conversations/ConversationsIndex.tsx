import * as React from 'react'
import axios from 'axios'
import ConversationsList from 'components/ConversationsList'

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
    <ConversationsList />
  )
}

export default ConversationsIndex

// {conversations.map((conversation: Conversation, index) => {
//   return <div key={index}>
//             <p>id: {conversation.id}</p>
//             <p>created at: {conversation.created_at}</p>
//             <p>Author Name: {conversation.author.name}</p>
//             <p>Receiver Name: {conversation.receiver.name}</p>
//             {conversation.messages.map((message: ConversationMessage, index) => {
//               return <div key={index}>
//                         <p>id: {message.id}</p>
//                         <p>name: {message.name}</p>
//                         <p>body: {message.body}</p>
//                      </div>
//             })}
//          </div>
// })}