// src/components/ShopButton.js
import { useState } from 'react';
import './shopButton.css'

interface ShopButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>; // Тип для обработчика onClick
  }

const ShopButton: React.FC<ShopButtonProps> = ({ onClick }) => {
    return (
      <button 
        className="bottom-button"
        onClick={onClick}
      >
        Магазин
      </button>
    );
  };
  
  export default ShopButton;