// Balance.tsx
import { useState, useEffect, useRef } from 'react';
import './balance.css';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { saveUserData, setupAutoSave, setupSaveOnBlur, setupSaveOnUnload, loadFromLocalStorage } from '../../services/saveUserData';

interface BalanceProps {
  onLog: (message: string) => void; // Функция для добавления логов 
}

function Balance({ onLog }: BalanceProps) {
  const [balance, setBalance] = useState(0); // Баланс игрока
  const [tempBalance, setTempBalance] = useState(0); // Временный баланс для локального состояния
  const [purchases, setPurchases] = useState<string[]>([]); // Информация о покупках
  const incomeRef = useRef<HTMLDivElement[]>([]); // Ссылка на элементы анимации дохода
  const userId = retrieveLaunchParams().tgWebAppData?.user?.id; // ID пользователя (замените на реальный ID)

  useEffect(() => {
    if (!userId) {
      console.error('User ID отсутствует.');
      return;
    }

    // Загрузка начальных данных из LocalStorage  
    const initialData = loadFromLocalStorage(userId.toString());
    if (initialData) {
      setBalance(initialData.balance || 0);
      setTempBalance(initialData.balance || 0);
      setPurchases(initialData.purchases || []);
    }

    // Пассивный доход каждую секунду
    const incomeInterval = setInterval(() => {
      setTempBalance((prevBalance) => prevBalance + 1);
      addIncomeAnimation('1$');
    }, 1000);

    // Сохранение данных в LocalStorage при каждом изменении баланса
    useEffect(() => {
      if (userId) {
        saveUserData(userId.toString(), { balance: tempBalance, purchases });
      }
    }, [userId, tempBalance, purchases]);

    // Автоматическое сохранение каждые 30 секунд
    const cleanupAutoSave = setupAutoSave(userId.toString(), () => ({ balance: tempBalance, purchases }));

    // Сохранение при сворачивании приложения
    const cleanupSaveOnBlur = setupSaveOnBlur(userId.toString(), () => ({ balance: tempBalance, purchases }));

    // Сохранение при закрытии вкладки
    const cleanupSaveOnUnload = setupSaveOnUnload(userId.toString(), () => ({ balance: tempBalance, purchases }));

    return () => {
      clearInterval(incomeInterval);
      cleanupAutoSave();
      cleanupSaveOnBlur();
      cleanupSaveOnUnload();
    };
  }, [userId]);


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
      <h1>{tempBalance}$</h1>
    </div>
  );
}

export default Balance;
