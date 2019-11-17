import styled from 'styled-components'

export const StyledAuthForm = styled.form`
  text-align: center;
  margin: auto;
  width: 40%;
`

export const StyledHeader = styled.h1`

`

export const StyledButton = styled.button`
  width: 100%;
  margin: 1em 0;
  box-shadow: rgba(23, 43, 99, 0.35) 0 7px 28px;
  background-color: #1E7EF6;
  color: white;
  border: 0;
  border-radius: 4px;
  padding: .5em;
  font-weight: bold;
`

export const StyledInput = styled.input`
  width: 90%;
  padding: .5em;
  margin: .25em 0;
  background-color: #DCDEE4;
  border-radius: 4px;
  border: 1px solid gray;
  :focus { 
    background-color: white;
    border: 1px solid #1E7EF6;
  }
`