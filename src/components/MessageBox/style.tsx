import styled from 'styled-components'

export const StyledMessageBox = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  overflow: scroll;
  align-content: center;
`

export const StyledMessageForm = styled.form`
 height: 13%;
 background-color: white;
 display: flex;
 padding: 25px;
`

export const StyledButton = styled.button`
  flex: 1;
  background-color: rgb(44, 10, 122);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px;
  height: 100%;
  margin-top: auto;
  margin-bottom: auto;
`

export const StyledTextArea = styled.textarea`
  flex: 3;
  background-color: white;
  resize: none;
  outline: none;
  border-width: 3px;
  border-color: rgb(182, 181, 186);
  margin-right: 3%;
`

export const StyledMessage = styled.div<{currentUser: boolean}>`
  align-self: center;
  max-width: 40%;
  font-size: 2em;
  background-color: white;
  border-radius: 25px;
  overflow-wrap: break-word;
  margin: .5em;
  margin-right: 20%;
  padding: 10px 20px;
  border-bottom-left-radius: 0;
  ${props => props.currentUser && `
    background-color: #0093D6;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 0;
    color: white;
    margin: .5em;
    margin-left: 20%;
  `}
`


export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`

export const MessageDiv = styled.div`
  width: 75%;
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
`