// RatingModal/RatingModal.tsx
import React, { useState, useEffect } from 'react';
import './raitingModal.css';

interface RatingModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const RatingModal: React.FC<RatingModalProps> = ({ onClose, isOpen }) => {
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
      <div className="modal_content">
        <h2 >Рейтинг</h2>
        <p>Содержимое рейтинга...</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default RatingModal;
