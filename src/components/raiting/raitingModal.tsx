// src/components/RatingModal/RatingModal.tsx
import React from 'react';
import styles from './raitingModal.module.css';

interface RatingModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const RatingModal: React.FC<RatingModalProps> = ({ onClose, isOpen }) => {
    return (
      <div className={`${styles.modal} ${isOpen ? styles.active : ''}`}>
        <div className={styles.modal_content}>
          <button 
            className={styles.close_button} 
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
