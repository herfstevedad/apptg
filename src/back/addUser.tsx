import { db } from '../back/fireBase'; // Импортируем конфигурацию Firebase
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Интерфейс для данных пользователя
interface UserData {
    username: string;
    createdAt: string;
  }

export async function addUserIfNotExists(userId: number, userData: UserData) {
    try {
      // Ссылка на документ пользователя
      const userRef = doc(db, 'users', userId.toString());
  
      // Проверяем, существует ли пользователь
      const userSnapshot = await getDoc(userRef);
  
      if (!userSnapshot.exists()) {
        // Если пользователь не существует, создаем новый документ
        await setDoc(userRef, userData);
        console.log('New user added:', userData);
      } else {
        console.log('User already exists:', userSnapshot.data());
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
