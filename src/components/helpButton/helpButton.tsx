// src/components/HelpButton/helpButton.tsx
import './styles.css';

interface HelpButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Функция для открытия модального окна
}

const HelpButton: React.FC<HelpButtonProps> = ({ onClick }) => {

  return (
    <>
      {/* Кнопка вопросительного знака */}
      <button 
        className={"help_button"} 
        onClick={onClick} 
        aria-label="Помощь"
      >
        ?
      </button>

    </>
  );
};

export default HelpButton;