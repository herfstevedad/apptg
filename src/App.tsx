import { useEffect, useState } from 'react'
import { retrieveLaunchParams, init } from '@telegram-apps/sdk'
import './App.css'

function App() {

  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const initApp = async () => {
      try {

      } finally {
        setLoading(false);
      }
    }

    initApp();
  }, [] )

  if (loading) {
    return <div>Loading...</div>;
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
