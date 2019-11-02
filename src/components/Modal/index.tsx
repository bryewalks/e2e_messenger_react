import * as React from 'react'
import ReactDOM from 'react-dom';
import { Container, Overlay, Dialog, CloseButton } from './style'

const Context = React.createContext(null);

export function ModalProvider({ children }: any) {
  const modalRef = React.useRef(null);
  const [context, setContext] = React.useState();

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  React.useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <Container>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </Container>
  );
}

export function Modal({ onClose, children, ...props }: any) {
  const modalNode = React.useContext(Context);

  return modalNode
    ? ReactDOM.createPortal(
        <Overlay>
          <Dialog {...props}>
            {children}
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </Dialog>
        </Overlay>,
        modalNode
      )
    : null;
}