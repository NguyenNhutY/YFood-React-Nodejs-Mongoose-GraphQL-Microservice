import React from "react";
import "./modalCmt.scss";

interface ModalCmtProps {
  onCloseModalCmt: () => void;
}

const ModalCmt: React.FC<ModalCmtProps> = ({ onCloseModalCmt }) => {
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains("cmt-overlay")) {
      onCloseModalCmt();
    }
  };

  return (
    <div className='cmt-overlay' onClick={handleOverlayClick}>
      <div className='cmt-container'>
        <h2>Rating</h2>
        {/* Add additional content here as needed */}
      </div>
    </div>
  );
};

export default ModalCmt;
