import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Home from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home></Home>
    </>
  )
}

export default App
