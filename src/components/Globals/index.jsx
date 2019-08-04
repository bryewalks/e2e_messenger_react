import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 2em;
  padding: 1.5em 0;
  margin-right: auto;
  margin-left: auto;
  @media (max-width: 767px) {
    margin-top: 40px;
  }
  @media (min-width: 1200px) {
    width: 880px;
  }
`

export const Container = styled.div`
  width: 100%;
  background-color: ${props => (props.color ? props.color : 'white')};
`