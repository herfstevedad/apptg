import { useEffect, useState } from 'react'
import { retrieveLaunchParams } from '@telegram-apps/sdk'

import Loader from './components/loader/loader'
import Balance from './components/Balance/balance'
import ShopButton from './components/shop/shopButton/shopButton';
import ShopModal from './components/shop/shopModal/shopModel';
import RaitingButton from './components/raiting/raitingButton';
import RaitingModal from './components/raiting/raitingModal';
import HelpButton from './components/helpButton/helpButton';
import { addLog } from './services/logsService'

import './App.css'
import { addUserIfNotExists } from './components/back/addUser'

function App() {
  const [isloading, setisLoading] = useState(true);

  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isRaitingOpen, setIsRaitingOpen] = useState(false);

  // Состояние для логов
  //const [logs, setLogs] = useState<string[]>([]);

  // Функция для добавления логов
 // const addLog = (message: string) => {
 //   setLogs((prevLogs) => [...prevLogs, message]);
 // };

  useEffect (() => {
    addLog('Приложение запущено.')
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
      <Balance onLog={addLog}/> 
      
      <HelpButton/>

      {/* Контейнер кнопок внизу */}
      <div className="bottom-buttons">
        <ShopButton onClick={() => setIsShopOpen(true)} />
        <RaitingButton onClick={() => setIsRaitingOpen(true)} />
      </div>

      {/* Модальные окна */}
      <ShopModal 
        isOpen={isShopOpen} 
        onClose={() => setIsShopOpen(false)} 
        //onLog={addLog} // Передаем функцию для логирования
      />
      <RaitingModal 
        isOpen={isRaitingOpen} 
        onClose={() => setIsRaitingOpen(false)} 
        //onLog={addLog} // Передаем функцию для логирования
      />
    </div>
  );
}

export default App
