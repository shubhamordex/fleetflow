import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-blue-800">
        Tailwind is Working 🚀
      </h1>
      <LoginPage />
    </div>
  )
}

export default App
