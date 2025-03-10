// src/components/HelpButton/helpButton.tsx
import React from 'react';
import './styles.css';

interface HelpButtonProps {
  onOpen: () => void; // Функция для открытия модального окна
}

const HelpButton: React.FC<HelpButtonProps> = ({ onOpen }) => {

  return (
    <>
      {/* Кнопка вопросительного знака */}
      <button 
        className={"help_button"} 
        onClick={onOpen} 
        aria-label="Помощь"
      >
        ?
      </button>

    </>
  );
};

export default HelpButton;