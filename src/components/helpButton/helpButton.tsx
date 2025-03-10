// src/components/HelpButton.tsx
import React from 'react';
import './styles.css';
import { useState } from 'react';
import LogsModal from '../Logs/LogsModal';
import { getLogs } from '../../services/logsService';

const HelpButton: React.FC = () => {
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  return (
    <>
      {/* Кнопка вопросительного знака */}
      <button 
        className={"help_button"} 
        onClick={() => setIsLogsOpen(true)} 
        aria-label="Помощь"
      >
        ?
      </button>

      {/* Модальное окно логов */}
      <LogsModal 
        isOpen={isLogsOpen} 
        onClose={() => setIsLogsOpen(false)} 
        logs={getLogs()} // Получаем логи из сервиса
      />
    </>
  );
};

export default HelpButton;