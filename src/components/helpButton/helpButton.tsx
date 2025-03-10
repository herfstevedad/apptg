// src/components/HelpButton/helpButton.tsx
import React from 'react';
import './styles.css';

interface HelpButtonProps {
  onClick: () => void; // Функция для открытия модального окна
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