import './raitingButton.css'

interface RaitingButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }
  
  const RaitingButton: React.FC<RaitingButtonProps> = ({ onClick }) => {
    return (
      <button 
        className="bottom-button"
        onClick={onClick}
      >
        Рейтинг
      </button>
    );
  };
  
  export default RaitingButton;