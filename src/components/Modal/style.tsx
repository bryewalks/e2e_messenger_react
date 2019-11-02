import styled, {keyframes} from 'styled-components'

const fadeIn = keyframes`from { opacity: 0; }`;

export const Container = styled.div`
  text-align: center;
`

export const Overlay = styled.div`
  animation: ${fadeIn} 200ms ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

export const Dialog = styled.div`
  background: white;
  min-width: 35%;
  border-radius: 5px;
  padding: 20px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(44, 10, 122);
  color: white;
  border: none;
  &:hover {
    background-color: #FF4242;
  }
`