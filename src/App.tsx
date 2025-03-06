import { useEffect, useState } from 'react'
import { retrieveLaunchParams } from '@telegram-apps/sdk'

import Loader from './components/loader/loader'
import Balance from './components/Balance/balance'
import ShopButton from './components/shop/shopButton';
import ShopModal from './components/shop/shopModel';
import RaitingButton from './components/raiting/raitingButton';
import RaitingModal from './components/raiting/raitingModal';


import './App.css'
import { addUserIfNotExists } from './components/back/addUser'

function App() {
  const [isloading, setisLoading] = useState(true);

  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isRaitingOpen, setIsRaitingOpen] = useState(false);


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
        <RaitingButton onClick={() => setIsRaitingOpen(true)} />
      </div>

      <ShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
      />
      <RaitingModal
        isOpen={isRaitingOpen}
        onClose={() => setIsRaitingOpen(false)}
      />
    </div>
  );
}

export default App
