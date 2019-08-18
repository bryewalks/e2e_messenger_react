import * as React from 'react'
import axios from 'axios'
import ConversationsList from 'components/ConversationsList'
import MessageBox from 'components/MessageBox'

const ConversationsIndex: React.FC = () => {
  const [chatter, setChatter] = React.useState(0);

  function chatterCallBack(userId: number): void {
    console.log(userId)
    setChatter(userId);
  }

  return (
    <div>
      <ConversationsList chatterCallBack={chatterCallBack}/>
      <MessageBox chatter={chatter}/>
    </div>
  )
}

export default ConversationsIndex