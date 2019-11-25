import * as React from 'react'
import { Container } from 'components/Globals'
import ConversationsList from 'components/ConversationsList'
import MessageBox from 'components/MessageBox'

const ConversationsIndex: React.FC = (props: any) => {
  const [conversationId, setConversationId] = React.useState(0);

  function conversationIdCallBack(userId: number): void {
    setConversationId(userId);
  }

  return (
    <Container>
      <ConversationsList router={props.history} conversationIdCallBack={conversationIdCallBack}/>
      <MessageBox conversationId={conversationId}/>
    </Container>
  )
}

export default ConversationsIndex