import React from 'react';
import './itemCard.css';

interface ItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onBuy: (id: number) => void;
}

const ItemCard: React.FC<ItemProps> = ({ id, name, price, image, onBuy }) => {
  return (
    <div className={"item_card"}>
      <img src={image} alt={name} className={"item_image"} />
      <h3 className={"item_name"}>{name}</h3>
      <button className={"buy_button"} onClick={() => onBuy(id)}>
        Купить за {price} ₽
      </button>
    </div>
  );
};

export default ItemCard;