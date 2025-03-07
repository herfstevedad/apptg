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
        <button 
            className={"close-button"} 
            onClick={onClose} 
            aria-label="Закрыть"
        />
        <h2>Рейтинг</h2>
        <p>Содержимое рейтинга...</p>
      </div>
    </div>
  );
};

export default RatingModal;
