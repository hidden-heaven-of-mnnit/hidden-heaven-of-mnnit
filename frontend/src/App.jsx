import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import TreasureLogin from './components/TreasureLogin'
import HomePage from './components/HomePage'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><TreasureLogin/></>
    },
  ]);
  return (
    <>
      <TreasureLogin/>
    </>
  )
}

export default App
