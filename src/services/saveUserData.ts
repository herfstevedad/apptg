// src/services/saveUserData.ts
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../components/back/fireBase';
import { addLog } from './logsService';

// Сохранение данных в LocalStorage
export async function saveToLocalStorage(userId: string, data: any) {
  try {
    const userKey = `user_${userId}`;
    localStorage.setItem(userKey, JSON.stringify(data));
    addLog(`Данные успешно сохранены в LocalStorage: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error('Ошибка сохранения данных в LocalStorage:', error);
  }
}

// Загрузка данных из Firestore и запись в LocalStorage
export async function loadAndSaveToLocalStorage(userId: string): Promise<any | null> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      addLog(`Данные успешно загружены из Firestore: ${JSON.stringify(data)}`);
      saveToLocalStorage(userId, data); // Записываем данные в LocalStorage
      return data;
    } else {
      addLog('Документ пользователя не найден. Создаем новый...');
      const defaultData = { balance: 0, purchases: [] };
      await setDoc(userDocRef, defaultData, { merge: true }); // Создаем документ с начальными данными
      saveToLocalStorage(userId, defaultData); // Записываем начальные данные в LocalStorage
      return defaultData;
    }
  } catch (error) {
    addLog(`Ошибка загрузки данных из Firestore `);
    return null;
  }
}

// Загрузка данных из LocalStorage
export function loadFromLocalStorage(userId: string): any | null {
  try {
    const userKey = `user_${userId}`;
    const storedData = localStorage.getItem(userKey);
    if (storedData) {
      addLog(`Данные успешно загружены из LocalStorage: ${storedData}`); // Логируем через addLog
    } else {
      addLog('Данные отсутствуют в LocalStorage.'); // Логируем через addLog
    }
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    addLog(`Ошибка загрузки данных из LocalStorage`); // Логируем ошибку
    return null;
  }
}

// Перенос данных из LocalStorage в Firestore
export async function saveLocalStorageToFirestore(userId: string) {
  try {
    const userKey = `user_${userId}`;
    const storedData = localStorage.getItem(userKey);

    if (storedData) {
      const data = JSON.parse(storedData);
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, data, { merge: true });
      addLog(`Данные успешно перенесены из LocalStorage в Firestore: ${JSON.stringify(data)}`);
    } else {
      addLog('Данные отсутствуют в LocalStorage. Нечего сохранять.');
    }
  } catch (error) {
    console.error('Ошибка переноса данных из LocalStorage в Firestore:', error);
    addLog(`Ошибка переноса данных из LocalStorage в Firestore:`)
  }
}

// Автоматическое сохранение каждые 30 секунд
export function setupAutoSave(userId: string) {
  let autoSaveTimeout: NodeJS.Timeout | null = null;

  const autoSave = async () => {
    addLog('Срабатывает автоматическое сохранение...');
    await saveLocalStorageToFirestore(userId); // Переносим данные из LocalStorage в Firestore
  };

  const interval = setInterval(() => {
    addLog('Запускаю таймер автоматического сохранения...');
    autoSaveTimeout = setTimeout(autoSave, 30000); // Вызываем сохранение каждые 30 секунд
  }, 30000);

  return () => {
    addLog('Очищаю интервал автоматического сохранения...');
    clearInterval(interval);
    if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
  };
}

// Сохранение при сворачивании приложения
export function setupSaveOnBlur(userId: string) {
  const handleBlur = async () => {
    await saveLocalStorageToFirestore(userId);
  };

  window.addEventListener('blur', handleBlur);

  return () => {
    window.removeEventListener('blur', handleBlur);
  };
}

// Сохранение при закрытии вкладки
export function setupSaveOnUnload(userId: string) {
  const handleUnload = async () => {
    await saveLocalStorageToFirestore(userId);
  };

  window.addEventListener('beforeunload', handleUnload);

  return () => {
    window.removeEventListener('beforeunload', handleUnload);
  };
}