// src/components/RatingModal/RatingModal.tsx
import React from 'react';
import './raitingModal.css';

interface RatingModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const RatingModal: React.FC<RatingModalProps> = ({ onClose, isOpen }) => {
    return (
    <div className={`modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-content">
        <h2>Рейтинг</h2>
        <p>Содержимое рейтинга...</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default RatingModal;
