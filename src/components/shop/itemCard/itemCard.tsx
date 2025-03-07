import React from 'react';
import styles from './itemCard.css';

interface ItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onBuy: (id: number) => void;
}

const ItemCard: React.FC<ItemProps> = ({ id, name, price, image, onBuy }) => {
  return (
    <div className={styles.item_card}>
      <img src={image} alt={name} className={styles.item_image} />
      <h3 className={styles.item_name}>{name}</h3>
      <button className={styles.buy_button} onClick={() => onBuy(id)}>
        Купить за {price} ₽
      </button>
    </div>
  );
};

export default ItemCard;