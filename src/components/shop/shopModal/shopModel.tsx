// ShopModal/ShopModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import './shopModal.css';
import ItemCard from '../itemCard/itemCard';
import { ShopItem } from '../../../types/shopItems';


interface ShopModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const ShopModal: React.FC<ShopModalProps> = ({ onClose, isOpen }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
      if (isOpen) {
        fetch('/data/shopItems.json')
          .then((res) => {
            if (!res.ok) {
              throw new Error('Не удалось загрузить данные');
            }
            return res.json();
          })
          .then((data: ShopItem[]) => {
            console.log('Загруженные данные:', data); // Логирование данных
            setItems(data);
          })
          .catch((error) => {
            console.error('Ошибка загрузки данных:', error);
            setItems([]); // Установите пустой массив, если данные недоступны
          });
      }
    }, [isOpen]);

    const handleBuy = (itemID: number) => {
      console.log(`Покупка товара: ${itemID}`);
      alert(`Вы купили "${items.find(item => item.id === itemID)?.name}"`);
    }

    if (items.length === 0 && isOpen) {
      return (
        <div className={"modal"}>
          <div className={"modal_content"}>
            <p>Загрузка товаров...</p>
          </div>
        </div>
      );
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
