// Balance.tsx
import { useState, useEffect, useRef } from 'react';
import './Balance.css'; // Подключаем стили

function Balance() {
  const [balance, setBalance] = useState(0); // Баланс игрока
  const incomeRef = useRef<HTMLDivElement[]>([]); // Ссылка на элементы анимации дохода

  // Функция для добавления пассивного дохода
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prevBalance) => prevBalance + 1); // Увеличиваем баланс на 1 каждую секунду
      addIncomeAnimation('+1'); // Добавляем анимацию дохода
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