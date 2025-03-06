// src/components/ShopModal.js
import './shopModal.css'

interface ShopModalProps {
    onClose: () => void; // Тип для функции закрытия
  }
  
  const ShopModal: React.FC<ShopModalProps> = ({ onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Магазин</h2>
          <p>Содержимое магазина...</p>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    );
  };
  
  export default ShopModal;