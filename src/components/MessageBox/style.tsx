import styled from 'styled-components'

export const StyledMessageBox = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  overflow: auto;
  align-content: center;
  text-align: center;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
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
  height: 50%;
  min-height: 30px;
  margin-top: auto;
  margin-bottom: auto;
  ${props => props.disabled && `
    background-color: gray;
  `}
`

export const StyledTextArea = styled.textarea`
  flex: 5;
  background-color: white;
  resize: none;
  outline: none;
  border-width: 3px;
  border-color: rgb(182, 181, 186);
  margin-right: 3%;
  font-size: 24px;
  @media (max-width: 600px) {
    width: 80px;
    font-size: 16px;
  }
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
export const StyledDecryptForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `

export const StyledDecryptButton = styled.button`
  background-color: rgb(44, 10, 122);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 2vw;
  font-weight: bold;
  border-radius: 10px;
  width: 21%;
  padding: 5px;
`

export const StyledDecryptInput = styled.input`
  width: 20%;
  font-size: 24px;
  font-weight: bold;
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