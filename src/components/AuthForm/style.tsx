import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledAuthForm = styled.form`
  text-align: center;
  margin: auto;
  width: 40%;
  background-color: white;
  border-radius: 15px;
`

export const StyledHeader = styled.h1`
  background: rgb(44, 10, 122);
  color: white;
  border-radius: 15px 15px 0px 0px;
  padding: 10px;
  margin-bottom: 0;
`

export const StyledButton = styled.button`
  width: 100%;
  box-shadow: rgba(23, 43, 99, 0.35) 0 7px 28px;
  background-color: #1E7EF6;
  color: white;
  border: 0;
  border-radius: 0px 0px 15px 15px;
  padding: 10px;
  font-weight: bold;
  font-size: 24px;
`

export const StyledInput = styled.input`
  width: 90%;
  padding: .5em;
  margin: 1.5em 0;
  margin-bottom: 0;
  background-color: #DCDEE4;
  border-radius: 4px;
  border: 1px solid gray;
  :focus { 
    background-color: white;
    border: 1px solid #1E7EF6;
  }
`

export const StyledLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5em;
`

export const StyledQuestion = styled.p`
  margin-top: 1.5em;
  margin-bottom: 0;
`