import { useEffect, useState } from 'react'
import { retrieveLaunchParams } from '@telegram-apps/sdk'

import Loader from './front/loader/loader'
import './App.css'
import { addUserIfNotExists } from './back/addUser'

function App() {

  const [isloading, setisLoading] = useState(true);

  useEffect (() => {
    const initApp = async () => {
      try {

        // Получаем данные пользователя Telegram
        const UserID = retrieveLaunchParams().tgWebAppData?.user?.id;
        const UserName = retrieveLaunchParams().tgWebAppData?.user?.username;

        if (UserID) {
            // Создаем объект данных пользователя
          const userData = {
            username: UserName || 'Unknown',
            createdAt: new Date().toISOString(),
          };

           // Добавляем пользователя, если его нет
          await addUserIfNotExists(UserID, userData);
        } else {
          console.warn('User Data is not available')
        }

      } finally {
        setisLoading(false);
      }
    }

    initApp();
  }, [] )

  if (isloading) {
    return <Loader />
  }

  return (
    <div className="app">
      <h1>Welcome</h1>
      <p>User ID: {retrieveLaunchParams().tgWebAppData?.user?.id}</p>
      <p>Username: {retrieveLaunchParams().tgWebAppData?.user?.username}</p>
    </div>
  );
}

export default App
