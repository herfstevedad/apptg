import { useEffect, useState } from 'react'
import { retrieveLaunchParams } from '@telegram-apps/sdk'

import Loader from './components/loader/loader'
import Balance from './components/Balance/balance'
import ShopButton from './components/shop/shopButton';
import ShopModal from './components/shop/shopModel';
import './App.css'
import { addUserIfNotExists } from './components/back/addUser'

function App() {
  const [isloading, setisLoading] = useState(true);

  const [isShopOpen, setIsShopOpen] = useState(false);

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
      <Balance /> 
      <div className="bottom-buttons">
        <ShopButton onClick={() => setIsShopOpen(true)} />
      </div>

      {isShopOpen && <ShopModal onClose={() => setIsShopOpen(false)} />}
    </div>
  );
}

export default App
