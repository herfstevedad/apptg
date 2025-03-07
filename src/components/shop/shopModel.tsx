// ShopModal/ShopModal.tsx
import React from 'react';
import styles from './shopModal.module.css';

interface ShopModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const ShopModal: React.FC<ShopModalProps> = ({ onClose, isOpen }) => {
    return (
      <div className={`${styles.modal} ${isOpen ? styles.active : ''}`}>
        <div className={styles.modal_content}>
          <button 
            className={styles.close_button} 
            onClick={onClose} 
            aria-label="Закрыть"
          />
          <h2>Магазин</h2>
          <p>Содержимое магазина...</p>
        </div>
      </div>
    );
  };
  

export default ShopModal;
