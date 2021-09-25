import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};
const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = () => document.getElementById("overlays");

const Modal = ({ children, onClose }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        portalElement("overlay")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement("overlay")
      )}
    </React.Fragment>
  );
};

export default Modal;
