// src/components/HelpButton/helpButton.tsx
import React from 'react';
import './styles.css';
import LogsModal from '../log/logsModal'; // Импорт модального окна логов
import { getLogs } from '../../services/logsService';

interface HelpButtonProps {
  onOpen: () => void; // Функция для открытия модального окна
}

const HelpButton: React.FC<HelpButtonProps> = ({ onOpen }) => {
  const [isLogsOpen, setIsLogsOpen] = React.useState(false); // Состояние для логов

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

      {/* Модальное окно логов */}
      <LogsModal 
        isOpen={isLogsOpen} 
        onClose={() => setIsLogsOpen(false)} 
        logs={getLogs()} 
      />
    </>
  );
};

export default HelpButton;