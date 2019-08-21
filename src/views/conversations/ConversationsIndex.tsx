import * as React from 'react'
import axios from 'axios'
import ConversationsList from 'components/ConversationsList'
import MessageBox from 'components/MessageBox'

const ConversationsIndex: React.FC = () => {
  const [chatterId, setChatterId] = React.useState(0);

  function chatterIdCallBack(userId: number): void {
    setChatterId(userId);
  }

  return (
    <div>
      <ConversationsList chatterCallBack={chatterIdCallBack}/>
      <MessageBox chatterId={chatterId}/>
    </div>
  )
}

export default ConversationsIndex