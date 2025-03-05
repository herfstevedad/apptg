import { useEffect, useState } from 'react'
import { retrieveLaunchParams, init } from '@telegram-apps/sdk'

import Loader from './front/loader/loader'
import './App.css'

function App() {

  const [isloading, setisLoading] = useState(true);

  useEffect (() => {
    const initApp = async () => {
      try {

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
