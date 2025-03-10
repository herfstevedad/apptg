// src/components/HelpButton.tsx
import React from 'react';
import './styles.css';
import { useState } from 'react';
import LogsModal from '../log/logsModal';
import { getLogs } from '../../services/logsService';

const HelpButton: React.FC = () => {
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  return (
    <div>
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
    </div>
  );
};

export default HelpButton;