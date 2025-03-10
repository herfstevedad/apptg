// Balance.tsx
import { useState, useEffect, useRef } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './balance.css';
import { db } from '../back/fireBase'; // Импортируем из fireBase
import { retrieveLaunchParams } from '@telegram-apps/sdk'

interface BalanceProps {
  onLog: (message: string) => void; // Функция для добавления логов
}

function Balance({ onLog }: BalanceProps) {
  const [balance, setBalance] = useState(0); // Баланс игрока
  const [tempBalance, setTempBalance] = useState(0); // Временный баланс для локального состояния
  const incomeRef = useRef<HTMLDivElement[]>([]); // Ссылка на элементы анимации дохода
  const userId = retrieveLaunchParams().tgWebAppData?.user?.id; // ID пользователя (замените на реальный ID)

  useEffect(() => {
    const fetchInitialBalance = async () => {
      if (userId) {
        try {
          const userDocRef = doc(db, 'users', userId.toString());
          const docSnapshot = await getDoc(userDocRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data && data.balance !== undefined) {
              onLog(`Загружен начальный баланс: ${data.balance}`); // Добавляем лог
              setBalance(data.balance); // Устанавливаем начальный баланс
              setTempBalance(data.balance); // Устанавливаем временный баланс
            }
          } else {
            onLog('Документ пользователя не найден. Создаем новый...'); // Добавляем лог
            await setDoc(userDocRef, { balance: 0 }, { merge: true });
            setBalance(0);
            setTempBalance(0);
          }
        } catch (error) {
          onLog('Ошибка загрузки баланса из Firestore.'); // Добавляем лог
          console.error('Ошибка загрузки баланса:', error);
        }
      }
    };

    fetchInitialBalance();

    // Пассивный доход каждую секунду
    const interval = setInterval(() => {
      setTempBalance((prevBalance) => {
        const newBalance = prevBalance + 1;
        onLog(`Баланс увеличен: ${newBalance}`); // Добавляем лог
        addIncomeAnimation('+1'); // Добавляем анимацию дохода
        return newBalance;
      });
    }, 1000);

    // Обработка закрытия приложения
    const handleAppClose = async () => {
      if (userId && tempBalance !== balance) {
        try {
          const userDocRef = doc(db, 'users', userId.toString());
          await setDoc(userDocRef, { balance: tempBalance }, { merge: true });
          console.log('Баланс успешно сохранен:', tempBalance);
          onLog(`Баланс сохранен: ${tempBalance}`); // Добавляем лог
        } catch (error) {
          onLog('Ошибка сохранения баланса при закрытии приложения.'); // Добавляем лог
          console.error('Ошибка сохранения баланса:', error);
        }
      }
    };

    window.tgWebApp?.onEvent('close', handleAppClose);

    return () => {
      clearInterval(interval); // Очищаем интервал при размонтировании компонента
      window.tgWebApp?.offEvent('close', handleAppClose); // Удаляем обработчик события close
    };
  }, [userId, balance]);

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