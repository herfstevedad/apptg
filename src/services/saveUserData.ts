// src/services/saveUserData.ts
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../components/back/fireBase';

// Сохранение данных в LocalStorage
function saveToLocalStorage(userId: string, data: any) {
  try {
    const userKey = `user_${userId}`;
    localStorage.setItem(userKey, JSON.stringify(data));
    console.log('Данные успешно сохранены в LocalStorage:', data);
  } catch (error) {
    console.error('Ошибка сохранения данных в LocalStorage:', error);
  }
}

// Загрузка данных из LocalStorage
export function loadFromLocalStorage(userId: string): any | null { // Добавляем export
    try {
      const userKey = `user_${userId}`;
      const storedData = localStorage.getItem(userKey);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Ошибка загрузки данных из LocalStorage:', error);
      return null;
    }
  }

// Сохранение данных в Firestore
async function saveToFirestore(userId: string, data: any) {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, data, { merge: true });
    console.log('Данные успешно сохранены в Firestore:', data);
  } catch (error) {
    console.error('Ошибка сохранения данных в Firestore:', error);
  }
}

// Автоматическое сохранение каждые 30 секунд
export function setupAutoSave(userId: string, getData: () => any) {
  let autoSaveTimeout: NodeJS.Timeout | null = null;

  const autoSave = async () => {
    const userData = getData();
    if (userData) {
      await saveToFirestore(userId, userData);
    }
  };

  const interval = setInterval(() => {
    autoSaveTimeout = setTimeout(autoSave, 30000); // Сохраняем каждые 30 секунд
  }, 30000);

  return () => {
    clearInterval(interval);
    if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
  };
}

// Сохранение при сворачивании приложения
export function setupSaveOnBlur(userId: string, getData: () => any) {
  const handleBlur = async () => {
    const userData = getData();
    if (userData) {
      await saveToFirestore(userId, userData);
    }
  };

  window.addEventListener('blur', handleBlur);

  return () => {
    window.removeEventListener('blur', handleBlur);
  };
}

// Сохранение при закрытии вкладки
export function setupSaveOnUnload(userId: string, getData: () => any) {
  const handleUnload = async () => {
    const userData = getData();
    if (userData) {
      await saveToFirestore(userId, userData);
    }
  };

  window.addEventListener('beforeunload', handleUnload);

  return () => {
    window.removeEventListener('beforeunload', handleUnload);
  };
}

// Обновленная функция для сохранения данных
export async function saveUserData(userId: string, data: any) {
  // Сохраняем данные в LocalStorage
  saveToLocalStorage(userId, data);

  // Сохраняем данные в Firestore
  await saveToFirestore(userId, data);
}