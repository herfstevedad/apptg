// ShopModal/ShopModal.tsx
import React, { useEffect, useRef } from 'react';
import './shopModal.css';

interface ShopModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const ShopModal: React.FC<ShopModalProps> = ({ onClose, isOpen }) => {
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
        <h2>Магазин</h2>
        <p>Содержимое магазина...</p>
      </div>
    </div>
  );
};

export default ShopModal;
