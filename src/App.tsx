import React, { useState, useEffect } from 'react'
import { retrieveLaunchParams, init, miniApp } from '@telegram-apps/sdk'
import './App.css'

function App() {
  useEffect (() => {
    const tg = retrieveLaunchParams();
    
    const telegramUserID = tg.tgWebAppData?.user?.id;
    const telegramUserName = tg.tgWebAppData?.user?.username;


    init();

  }, [] )


  return (
    <div className="app">
      <h1>Welcome</h1>
      <p>User ID: {retrieveLaunchParams().tgWebAppData?.user?.id}</p>
      <p>Username: {retrieveLaunchParams().tgWebAppData?.user?.username}</p>
    </div>
  );
}

export default App
