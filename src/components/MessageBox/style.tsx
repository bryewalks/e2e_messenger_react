import styled from 'styled-components'

export const StyledMessageBox = styled.div`
  height: 91%;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const StyledMessageForm = styled.form`
  flex-grow: 1;
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: 10%;
  margin-top: 20px;
`

export const StyledButton = styled.button`
  background-color: rgb(44, 10, 122);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5%;
  margin: auto;
`

export const StyledTextArea = styled.textarea`
  background-color: transparent;
  resize: none;
  outline: none;
  height: 90%;
  border-width: 3px;
  border-color: rgb(182, 181, 186);
`

export const StyledMessage = styled.div<{currentUser: boolean}>`
  font-size: 2em;
  max-width: 40%;
  background-color: white;
  border-radius: 25px;
  overflow-wrap: break-word;
  margin: .5em;
  padding: 10px 20px;
  border-bottom-left-radius: 0;
  display: inline-block;
  margin-left: 30%;
  margin-right: 40%;
  ${props => props.currentUser && `
    background-color: #0093D6;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 0;
    color: white;
    margin-left: 40%;
    margin-right: 30%;
  `}
`


export const Container = styled.div`
 width: 100%;
`