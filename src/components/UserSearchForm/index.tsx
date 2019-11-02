import * as React from 'react'
import axios from 'axios'
import {StyledSearchForm, StyledName} from './style'

interface Props {
  userName: string,
  userId: number,
  conversationsCallback: Function
}

const UserSearchForm: React.FC<Props> = (props) => {
  const [isHidden, setIsHidden] = React.useState(true);
  const [conversationPassword, setConversationPassword] = React.useState('');

  const submitConversation = (userId: number) => (event: any) => {
    event.preventDefault()
    let params = {
      receiver_id: userId,
      password: conversationPassword,
      password_confirmation: conversationPassword
    }

    axios
      .post('/api/conversations', params)
      .then(response => props.conversationsCallback(response.data))
  }

  return (
    <StyledSearchForm>
      <StyledName onChange={() => {setIsHidden(false)}} onClick={() => {setIsHidden(!isHidden)}}>{props.userName}</StyledName><br />
      <div hidden={isHidden}>
        <form onSubmit={submitConversation(props.userId)}>
          <input onChange={e => {setConversationPassword(e.target.value)}}/>
          <button>submit</button>
        </form>
      </div>  
    </StyledSearchForm>
  )
}
export default UserSearchForm