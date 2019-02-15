import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ownHistory } from './App';

interface Props {
  title: string,
  content: string,
}

const Modal: React.FC<Props> = (props) => {
  const rootPortal = document.querySelector('#modal');
  if (rootPortal) {
  return ReactDOM.createPortal (
    <div onClick={() => ownHistory.push('/')} className="ui dimmer visible active">
      <div onClick={e => e.stopPropagation()}className="ui standard modal visible active">
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.children}</div>
      </div>
    </div>, rootPortal
   );
  } 
  return null;
};

export default Modal;