import * as React from 'react'
import axios from 'axios'
import {StyledSearchForm, StyledName} from './style'

interface Props {
  conversationsCallback: Function
}

const UserSearchForm: React.FC<Props> = (props) => {
  const [isHidden, setIsHidden] = React.useState(true);
  const [conversationPassword, setConversationPassword] = React.useState('');
  const [userSearch, setUserSearch] = React.useState('');
  const [searchedUser, setSearchedUser] = React.useState({} as any);
  const [error, setError] = React.useState('');

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

  const handleSearch = (event: any) => {
    event.preventDefault();
    let params = {
      search: userSearch
    }
    axios
      .get('/api/users/search', {params})
      .then(response => { setError('')
                          setSearchedUser(response.data)})
      .catch(error => {setSearchedUser({})
                       setError(error.response.data.error)});
  }

  const generatePassword = () => {
    let password = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    let passwordLength = 12;
    
    for (let i = 0; i < passwordLength; i++)
      password += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return password;
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input placeholder='Search Users'
               type='search'
               onChange={e => {setUserSearch(e.target.value)}} />
        <button disabled={userSearch.length === 0}>Search</button>
        {error && (<p>{error}</p>)}
      </form>
      <StyledSearchForm>
        {searchedUser.name && (<StyledName onChange={() => {setIsHidden(false)}}
                                           onClick={() => {setIsHidden(!isHidden)}}>
                                           {searchedUser.name}
                               </StyledName>)}
        <div hidden={isHidden}>
          <form onSubmit={submitConversation(searchedUser.id)}>
            <input onChange={e => {setConversationPassword(e.target.value)}} value={conversationPassword}/>
            <button disabled={conversationPassword.length < 8}>submit</button>
            <br />
            <button type="button" onClick={() => setConversationPassword(generatePassword)}>Generate Password</button>
          </form>
        </div>  
      </StyledSearchForm>
    </div>
  )
}
export default UserSearchForm