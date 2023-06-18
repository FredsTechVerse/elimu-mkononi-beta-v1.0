import { useLayoutEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
const Modal = ({ children }) => {
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return <div className="modal-overlay">{children}</div>;
};

export default Modal;
