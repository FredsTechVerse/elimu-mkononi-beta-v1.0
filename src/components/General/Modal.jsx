import React, { useLayoutEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
const Modal = ({ children }) => {
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const [isModalClosed, setIsModalClosed] = useState(false);

  return (
    <div className={`${isModalClosed ? "hidden" : "modal-overlay fixed"}`}>
      <MdCancel
        className="h-8 w-8 absolute top-2 right-2"
        onClick={() => {
          setIsModalClosed(true);
        }}
      />
      {children}
    </div>
  );
};

export default Modal;
