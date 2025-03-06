import './raitingModal.css'

interface RatingModalProps {
    onClose: () => void; // Тип для функции закрытия
  }

const RatingModal: React.FC<RatingModalProps> = ({ onClose }) => {
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

export default RatingModal;