// ShopModal/ShopModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import './shopModal.css';
import ItemCard from '../itemCard/itemCard';


interface ShopModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const ShopModal: React.FC<ShopModalProps> = ({ onClose, isOpen }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
      if (isOpen) {
        if (isOpen) {
          console.log('Модальное окно магазина открыто. Начинаю загрузку данных...');
          
          fetch('/data/shopItems.json')
            .then((res) => {
              if (!res.ok) {
                throw new Error('Не удалось загрузить данные');
              }
              return res.json();
            })
            .then((data) => {
              console.log('Данные успешно загружены:', data);
              setItems(data); // Сохраняем данные в состояние
            })
            .catch((error) => {
              console.error('Ошибка загрузки данных:', error);
              setItems([]); // Устанавливаем пустой массив при ошибке
            });
        } else {
          console.log('Модальное окно магазина закрыто.');
        }
      }
    }, [isOpen]);

    const handleBuy = (itemID: number) => {
      console.log(`Покупка товара: ${itemID}`);
      alert(`Вы купили "${items.find(item => item.id === itemID)?.name}"`);
    }

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

        <div className={"items_container"}>
          {items.map((item) => (
            <ItemCard 
              key={item.id} 
              {...item} 
              onBuy={() => handleBuy(item.id)} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ShopModal;
