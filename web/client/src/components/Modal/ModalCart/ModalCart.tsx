import React from "react";
import "./modalCart.scss";

interface ModalCartProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalCart: React.FC<ModalCartProps> = ({ onClose, children }) => {
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal'>
        <button className='modal-close' onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalCart;
