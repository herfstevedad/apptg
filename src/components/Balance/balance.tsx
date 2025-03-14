// Balance.tsx
import { useState, useEffect, useRef } from 'react';
import './balance.css';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { 
  loadAndSaveToLocalStorage,
  setupAutoSave,
  setupSaveOnBlur,
  setupSaveOnUnload,
  saveToLocalStorage 
} from '../../services/saveUserData';

interface BalanceProps {
  onLog: (message: string) => void; // Функция для добавления логов 
}

function Balance({ onLog }: BalanceProps) {
  const [tempBalance, setTempBalance] = useState(0); // Временный баланс для локального состояния
  const [purchases, setPurchases] = useState<string[]>([]); // Информация о покупках
  const incomeRef = useRef<HTMLDivElement[]>([]); // Ссылка на элементы анимации дохода
  const userId = retrieveLaunchParams().tgWebAppData?.user?.id; // ID пользователя (замените на реальный ID)

  useEffect(() => {
    if (!userId) {
      console.error('User ID отсутствует.');
      return;
    }

    const stringUserId = userId.toString(); // Преобразуем userId в строку

    // Загрузка данных из Firestore и запись в LocalStorage
    const fetchInitialData = async () => {
      const initialData = await loadAndSaveToLocalStorage(stringUserId);
      if (initialData) {
        setTempBalance(initialData.balance || 0); // Устанавливаем временный баланс
        setPurchases(initialData.purchases || []); // Устанавливаем покупки
        onLog('Данные загружены');
      }
    };

    fetchInitialData();

    // Пассивный доход каждую секунду
    const incomeInterval = setInterval(() => {
      setTempBalance((prevBalance) => {
        const newBalance = prevBalance + 1;
        onLog(`Баланс увеличен: ${newBalance}$`);

        addIncomeAnimation(`+${1}$`);


        // Сохраняем обновленные данные в LocalStorage
        saveToLocalStorage(stringUserId, newBalance, purchases);

        return newBalance;
      });
    }, 1000);
    // Автоматическое сохранение каждые 30 секунд
    const cleanupAutoSave = setupAutoSave(stringUserId);

    // Сохранение при сворачивании приложения
    const cleanupSaveOnBlur = setupSaveOnBlur(stringUserId);

    // Сохранение при закрытии вкладки
    const cleanupSaveOnUnload = setupSaveOnUnload(stringUserId);

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
