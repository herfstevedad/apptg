import React from 'react';
import './styles.css';

interface LogsModalProps {
  onClose: () => void;
  isOpen: boolean;
  logs: string[];
}

const LogsModal: React.FC<LogsModalProps> = ({ onClose, isOpen, logs }) => {
  if (!isOpen) return null;

  return (
    <div className={"logs_modal"}>
      <div className={"logs_modal_content"}>
        {/* Шапка окна */}
        <div className={"logs_modal_header"}>
          <h2 className={"logs_modal_title"}>Логи</h2>
          <button className={"close_button"} onClick={onClose}>
            Закрыть ✕
          </button>
        </div>

        {/* Содержимое логов */}
        <div className={"logs_container"}>
          {logs.map((log, index) => (
            <div key={index} className={"log_item"}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogsModal;