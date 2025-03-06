// ShopModal/ShopModal.tsx
import React from 'react';
import './shopModal.css';

interface ShopModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const ShopModal: React.FC<ShopModalProps> = ({ onClose, isOpen }) => {
    return (
    <div className={`modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-content">
        <h2>Магазин</h2>
        <p>Содержимое магазина...</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ShopModal;
