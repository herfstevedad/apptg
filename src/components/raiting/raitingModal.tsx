import './raitingModal.css'

interface RaitingModalProps {
    onClose: () => void; // Тип для функции закрытия
  }

const RaitingModal: React.FC<RaitingModalProps> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Рейтинг</h2>
        <p>Содержимое рейтинга...</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default RaitingModal;