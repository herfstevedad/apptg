import './raitingButton.css'

interface RatingButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }
  
  const RatingButton: React.FC<RatingButtonProps> = ({ onClick }) => {
    return (
      <button 
        className="bottom-button"
        onClick={onClick}
      >
        Рейтинг
      </button>
    );
  };
  
  export default RatingButton;