import React, { useState, useEffect } from 'react';
import './shopModal.css';

interface ShopModalProps {
    onClose: () => void;
    isOpen: boolean;
  }

  const ShopModal: React.FC<ShopModalProps> = ({ onClose, isOpen }) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
      if (isOpen) {
        const timeout = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timeout);
      } else {
        setIsAnimated(false);
      }
    }, [isOpen]);

    return (
      <div
        className={`modal ${isAnimated ? 'active' : ''}`}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <div
          className="modal-content"
        >
          <h2>Магазин</h2>
          <p>Содержимое магазина...</p>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    );
  };
  
  export default ShopModal;
