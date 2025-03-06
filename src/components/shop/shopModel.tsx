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
      const timeout = setTimeout(() => setIsAnimated(true), 10); // Уменьшил задержку для более быстрого появления
      return () => clearTimeout(timeout);
    } else {
      setIsAnimated(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setIsAnimated(false), 300); // Задержка для анимации закрытия
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <div
      className={`modal ${isAnimated ? 'active' : ''} ${isOpen ? 'open' : ''}`}
      style={{ display: isOpen || isAnimated ? 'flex' : 'none' }}
    >
      <div className={`modal-content ${isAnimated ? 'slide-in' : 'slide-out'}`}>
        <h2>Магазин</h2>
        <p>Содержимое магазина...</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ShopModal;