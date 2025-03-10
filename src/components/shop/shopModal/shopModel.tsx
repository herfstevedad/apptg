// ShopModal/ShopModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import './shopModal.css';
import ItemCard from '../itemCard/itemCard';


interface ShopModalProps {
  onClose: () => void;
  isOpen: boolean;
 // onLog: (message: string) => void; // Новый пропс для логирования
}

const ShopModal: React.FC<ShopModalProps> = ({ onClose, isOpen}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen) {
          //onLog('Магазин открыт'); // Логируем открытие магазина
          
          fetch('/data/shopItems.JSON')
            .then((res) => res.json())
            .then((data) => {
              //onLog(`Загружено ${data.length} товаров`); // Логируем количество товаров
              setItems(data); // Сохраняем данные в состояние
            })
            //.catch((error) => {onLog(`Ошибка загрузки данных: ${error.message}`); // Логируем ошибку});
        } else {
          //onLog('Магазин закрыт'); // Логируем закрытие магазина
        }
    }, [isOpen]);

    const handleBuy = (itemID: number) => {
      //onLog(`Покупка товара ${itemID}`); // Логируем покупку
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
       className="modal_content"
       ref={modalRef}
       >
        <div className='modal_header'>
        <h2 className='modal_title'>Магазин</h2>
        <button 
            className={"close_button"} 
            onClick={onClose} 
            aria-label="Закрыть"
          />
        </div>
        
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
