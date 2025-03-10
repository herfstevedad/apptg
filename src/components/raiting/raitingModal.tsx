// src/components/RatingModal/RatingModal.tsx
import React, { useEffect, useRef } from 'react';
import './raitingModal.css';

interface RatingModalProps {
  onClose: () => void;
  isOpen: boolean;
  //onLog: (message: string) => void; // Новый пропс для логирования
}

const RatingModal: React.FC<RatingModalProps> = ({ onClose, isOpen }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect (( ) => {

        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current && 
                !modalRef.current.contains(event.target as Node) &&
                !(event.target instanceof HTMLButtonElement)
            ) {
                onClose();
            }
            };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        
    }, [isOpen, onClose]);

    return (
        <div 
        className={`modal ${isOpen ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()}
    >
      <div
       className="modal-content"
       ref={modalRef}
       >
      <button 
          className={"close-button"} 
          onClick={onClose} 
          aria-label="Закрыть"
        />
        <h2>Рейтинг</h2>
        <p>Содержимое рейтинга...</p>
      </div>
    </div>
  );
};

export default RatingModal;
