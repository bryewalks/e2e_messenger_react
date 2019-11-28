import styled from 'styled-components'

export const StyledList = styled.div`
  min-width: 25%;
  background-color: rgb(44, 10, 122);
  align-content: center;
  display: flex;
  flex-direction: column;
`

export const StyledListItem = styled.h1<{highlighted: boolean, alert: boolean}>`
  margin: 5% 15% 5% 15%;
  padding: 10px;
  border-radius: 25px;
  color: white;
  text-align: center;
  font-size: 2.8vw;
  transition: .4s;
  ${props => props.alert && `
    color: rgb(102, 255, 102);
  `}
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
  display: inline-block;
  height: 4.5vw;
  width: 4.5vw;
  line-height: 0;
  border-radius: 50%;
  background-color: rgb(44, 10, 122);
  border: none;
  color: #f2f2f2;
  font-size: 1vw;
  min-width: 30px;
  min-height: 30px;
  transition: .4s;
  margin-bottom: 5%;
  &:hover {
    cursor: pointer;
    background: white;
    color: rgb(44, 10, 122);
  }
`

export const StyledLogoutButton = styled.h1`
  padding: 10px;
  color: white;
  text-align: center;
  margin: 5% 15% 5% 15%;
  border-radius: 25px;
  margin-top: auto;
  font-size: 3vw;
  transition: .4s;
  &:hover {
    cursor: pointer;
    background-color: #FF4242;
    color: white;
  }
`

export const ScrollableDiv = styled.div`
  overflow: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(54, 77, 145,.5);
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
    box-shadow: 0 0 1px rgba(255,255,255,.5);
  }
`

export const CircleContainer = styled.div`
  width: 32%;
  text-align: center;
  display: inline-block;
  vertical-align: top;
`

export const StyledName = styled.h1`
  color: white;
  background-color: rgb(44, 10, 122);
  border-radius: 25px;
  display: inline-block;
  width: 30%;
  padding-bottom: 8px;
  &:hover {
    cursor: pointer;
  }
`

export const UserSearchForm = styled.div`
  align-content: center;
`

export const StyledPTag = styled.p`
  display: flex;
  justify-content: center;
  color: white;
  margin: 50px;
`