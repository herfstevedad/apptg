// src/services/saveUserData.ts
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../components/back/fireBase';

// Сохранение данных в LocalStorage
export function saveToLocalStorage(userId: string, data: any) {
  try {
    const userKey = `user_${userId}`;
    localStorage.setItem(userKey, JSON.stringify(data));
    console.log('Данные успешно сохранены в LocalStorage:', data);
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
      console.log('Данные успешно загружены из Firestore:', data);
      saveToLocalStorage(userId, data); // Записываем данные в LocalStorage
      return data;
    } else {
      console.warn('Документ пользователя не найден. Создаем новый...');
      const defaultData = { balance: 0, purchases: [] };
      await setDoc(userDocRef, defaultData, { merge: true }); // Создаем документ с начальными данными
      saveToLocalStorage(userId, defaultData); // Записываем начальные данные в LocalStorage
      return defaultData;
    }
  } catch (error) {
    console.error('Ошибка загрузки данных из Firestore:', error);
    return null;
  }
}

// Загрузка данных из LocalStorage
export function loadFromLocalStorage(userId: string): any | null {
  try {
    const userKey = `user_${userId}`;
    const storedData = localStorage.getItem(userKey);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Ошибка загрузки данных из LocalStorage:', error);
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
      console.log('Данные успешно перенесены из LocalStorage в Firestore:', data);
    } else {
      console.warn('Данные отсутствуют в LocalStorage.');
    }
  } catch (error) {
    console.error('Ошибка переноса данных из LocalStorage в Firestore:', error);
  }
}

// Автоматическое сохранение каждые 30 секунд
export function setupAutoSave(userId: string) {
  let autoSaveTimeout: NodeJS.Timeout | null = null;

  const autoSave = async () => {
    await saveLocalStorageToFirestore(userId);
  };

  const interval = setInterval(() => {
    autoSaveTimeout = setTimeout(autoSave, 30000); // Переносим данные каждые 30 секунд
  }, 30000);

  return () => {
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