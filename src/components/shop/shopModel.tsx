import React, { useState, useEffect } from 'react';
import './shopModal.css';


interface ShopModalProps {
    onClose: () => void;
    isOpen: boolean;
  }
  
  const ShopModal: React.FC<ShopModalProps> = ({ onClose, isOpen }) => {
    const [isAnimated, setIsAnimated] = useState(false);


    return (
      <div className={`modal ${isAnimated ? 'active' : ''}`} style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className="modal_content">
          <h2>Магазин</h2>
          <p>Содержимое магазина...</p>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    );
  };
  
  export default ShopModal;
