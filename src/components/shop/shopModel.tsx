import React, { useState, useEffect } from 'react';
import './shopModal.css';

interface ShopModalProps {
    onClose: () => void;
    isOpen: boolean; // Теперь принимаем состояние открытия извне
  }
  
  const ShopModal: React.FC<ShopModalProps> = ({ onClose, isOpen }) => {
    const [isAnimated, setIsAnimated] = useState(false);
  
    useEffect(() => {
      if (isOpen) {
        // Через 0.1 секунды после открытия запускаем анимацию
        const timeout = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timeout);
      } else {
        setIsAnimated(false); // Сброс анимации при закрытии
      }
    }, [isOpen]);   
  
    return (
      <div className={`modal ${isAnimated ? 'active' : ''}`}
           style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <div className="modal_content">
          <h2>Магазин</h2>
          <p>Содержимое магазина...</p>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    );
  };
  
  export default ShopModal;
