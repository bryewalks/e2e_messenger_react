import styled from 'styled-components'

export const StyledMessageBox = styled.div`
  height: 90%;
  overflow: scroll;
  background-color: rgb(182, 181, 186);
  width: 80%;
  position: fixed;
  top: 0;
  right: 0;
  margin-bottom: 12%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`

export const StyledMessageForm = styled.form`
  background-color: white;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 80%;
  height: 5%;
  padding-top: 2em;
  padding-bottom: 2em;
`

export const StyledButton = styled.button`
  background-color: rgb(44, 10, 122);
  border: none;
  color: white;
  width: 8%;
  height: 100%;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
  border-radius: 5%;
  margin-left: auto;
  margin-right: 1.5em;
`

export const StyledTextArea = styled.textarea`
  background-color: transparent;
  resize: none;
  outline: none;
  float: left;
  width: 80%;
  height: 90%;
  margin-left: 6%;
  margin-right: 2%;
  border-width: 3px;
  border-color: rgb(182, 181, 186);
`

export const StyledMessage = styled.div<{currentUser: boolean}>`
  font-size: 2em;
  max-width: 50%;
  background-color: white;
  border-radius: 25px;
  margin: .5em;
  margin-left: 20%;
  margin-right: 40%;
  padding: 10px 20px;
  display: flex;
  border-bottom-left-radius: 0;
  flex-direction: column;
  ${props => props.currentUser && `
    background-color: #0093D6;
    margin-left: 40%;
    margin-right: 20%;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 0;
    color: white;
  `}
`

export const Container = styled.div`
  /* width: 80%;
  position: fixed;
  top: 0;
  right: 0; */
`