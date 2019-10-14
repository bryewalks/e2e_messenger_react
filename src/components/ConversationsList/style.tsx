import styled from 'styled-components'

export const StyledList = styled.div`
  min-width: 20%;
  min-height: 100%;
  background-color: rgb(44, 10, 122);
  align-content: center;
`

export const StyledListItem = styled.h1<{highlighted: boolean}>`
  margin: 5% 15% 5% 15%;
  padding: 10px;
  border-radius: 25px;
  color: white;
  text-align: center;
  ${props => props.highlighted && `
    background: white;
    color: rgb(44, 10, 122);
  `}
  &:hover {
    cursor: pointer;
    background-color: white;
    color: rgb(44, 10, 122);
  }
`

export const StyledButton = styled.button`
  text-decoration: none;
  color: white;
  background-color: rgb(44, 10, 122);
  width: 50px;
  height: 50px;
  margin-top: 5%;
  border-radius: 50%;
  border: solid 5px white;
  align-content: center;
  transition: .4s;
  &:hover {
    cursor: pointer;
    background: white;
    color: rgb(44, 10, 122);
  }
`