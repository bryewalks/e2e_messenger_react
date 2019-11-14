import styled, { keyframes }from 'styled-components'

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
  display: flex;
  height: 100vh;
  min-width: 100%;
  /* width: 100%;
  background-color: ${props => (props.color ? props.color : 'white')}; */
`

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const Loader = styled.div`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #767676;
  border-radius: 50%;
  width: 2.28571429rem;
  height: 2.28571429rem;
  animation: ${spin} 0.6s linear infinite;
`

