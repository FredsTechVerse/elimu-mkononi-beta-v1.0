import React, { useLayoutEffect } from "react";
const Modal = ({ children }) => {
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return <div className="modal-overlay">{children}</div>;
};

export default Modal;
