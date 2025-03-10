import React from 'react';
import './itemCard.css';

interface ItemProps {
  id: number;
  name: string;
  price: number;
  onBuy: (id: number) => void;
}

const ItemCard: React.FC<ItemProps> = ({ id, name, price, onBuy }) => {
  return (
    <div className={"item_card"}>
      <h3 className={"item_name"}>{name}</h3>
      <button className={"buy_button"} onClick={() => onBuy(id)}>
        Купить за {price} ₽
      </button>
    </div>
  );
};

export default ItemCard;