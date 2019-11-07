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

  const generatePassword = () => {
    var pass = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    var passLength = (Math.random() * 15) + 5;
    
    for (var i = 0; i < passLength; i++)
      pass += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return pass;
  }

  return (
    <StyledSearchForm>
      <StyledName onChange={() => {setIsHidden(false)}} onClick={() => {setIsHidden(!isHidden)}}>{props.userName}</StyledName><br />
      <div hidden={isHidden}>
        <form onSubmit={submitConversation(props.userId)}>
          <input onChange={e => {setConversationPassword(e.target.value)}} value={conversationPassword}/>
          <button disabled={conversationPassword.length < 8}>submit</button>
          <br />
          <button type="button" onClick={() => setConversationPassword(generatePassword)}>Generate Password</button>
        </form>
      </div>  
    </StyledSearchForm>
  )
}
export default UserSearchForm