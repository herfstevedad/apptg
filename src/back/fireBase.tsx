import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyACol9LCc7_pl4dW7QRZfJYZv0asm9LCgs",
    authDomain: "test-db-6800e.firebaseapp.com",
    projectId: "test-db-6800e",
    storageBucket: "test-db-6800e.firebasestorage.app",
    messagingSenderId: "836798784511",
    appId: "1:836798784511:web:108bf0f82a5760cb4e7dca"
  };

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получение экземпляра Firestore
export const db = getFirestore(app);