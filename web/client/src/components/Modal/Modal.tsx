// src/components/Modal.tsx
import React from "react";
import "./modal.scss"; // Thêm style cho modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      (e.target as HTMLElement).classList.contains("modal-container-overlay")
    ) {
      onClose();
    }
  };

  return (
    <div className='modal-container-overlay' onClick={handleOverlayClick}>
      <div className='modal-container-content'>{children}</div>
    </div>
  );
};

export default Modal;
