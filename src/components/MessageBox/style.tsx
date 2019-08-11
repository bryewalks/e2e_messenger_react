import styled from 'styled-components'

export const StyledMessageBox = styled.div`
  min-height: 100%;
  overflow: hidden;
  width: 70%;
  background-color: rgb(182, 181, 186);
  position: fixed;
  top: 0;
  right: 0;
`

export const StyledMessageForm = styled.form`
  background-color: white;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 70%;
  height: 4em;
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