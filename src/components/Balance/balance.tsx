// Balance.tsx
import { useState, useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import './balance.css';
import { db } from '../back/fireBase'; // Импортируем из fireBase
import { retrieveLaunchParams } from '@telegram-apps/sdk'

function Balance() {
  const [balance, setBalance] = useState(0); // Баланс игрока
  const incomeRef = useRef<HTMLDivElement[]>([]); // Ссылка на элементы анимации дохода
  const userId = retrieveLaunchParams().tgWebAppData?.user?.id; // ID пользователя (замените на реальный ID)

  useEffect(() => {
    const userDocRef = doc(db, `users/${userId}`); // Создаем ссылку на документ

    // Подписываемся на изменения баланса в Firestore
    onSnapshot(userDocRef, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data && data.balance !== undefined) {
        setBalance(data.balance); // Обновляем баланс из Firestore
      }
    });

    // Пассивный доход каждую секунду
    const interval = setInterval(() => {
      setBalance((prevBalance) => {
        const newBalance = prevBalance + 1;

        // Обновляем баланс в Firestore
        setDoc(userDocRef, { balance: newBalance }, { merge: true });

        addIncomeAnimation('+1'); // Добавляем анимацию дохода
        return newBalance;
      });
    }, 1000);

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, []);

  // Функция для создания анимации дохода
  const addIncomeAnimation = (value: string) => {
    const newDiv = document.createElement('div');
    newDiv.className = 'income-animation';
    newDiv.textContent = value;

    // Добавляем элемент в DOM
    document.body.appendChild(newDiv);
    incomeRef.current.push(newDiv);

    // Удаляем элемент через 0.5 секунды
    setTimeout(() => {
      newDiv.remove();
      incomeRef.current = incomeRef.current.filter((el) => el !== newDiv);
    }, 500);
  };

  return (
    <div className="balance-container">
      <h1>{balance}$</h1>
    </div>
  );
}

export default Balance;