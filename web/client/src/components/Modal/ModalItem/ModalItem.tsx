import React from "react";
import "./modalItem.scss";

interface ModalItemProps {
  onCloseModalItem: () => void;
  detail: string;
  metail_1: string;
  metail_2: string;
  metail_3: string;
}

const ModalItem: React.FC<ModalItemProps> = ({
  onCloseModalItem,
  detail,
  metail_1,
  metail_2,
  metail_3,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLDivElement &&
      e.target.classList.contains("item-overlay")
    ) {
      onCloseModalItem();
    }
  };

  return (
    <div className='item-overlay' onClick={handleOverlayClick}>
      <div className='item-container'>
        <p>{detail}</p>
        <ul className='item-content'>
          <li>{metail_1}</li>
          <li>{metail_2}</li>
          <li>{metail_3}</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalItem;
