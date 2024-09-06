import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Home from './Pages/Home'
import DonorSignUp from './Pages/DonorSignUp'
import RecipientSignUp from './Pages/RecipientSignUp'
import DonorProfile from './Pages/DonorProfile'
import RecipientProfile from './Pages/RecipientProfile'
import FoodListsPage from './Pages/FoodListsPage'

function App() {
  return (
    <>
      {/* <Home></Home> */}
      {/* <DonorSignUp></DonorSignUp> */}
      {/* <RecipientSignUp></RecipientSignUp> */}
      {/* <DonorProfile></DonorProfile> */}
      <FoodListsPage></FoodListsPage>
      {/* <RecipientProfile></RecipientProfile> */}
    </>
  )
}

export default App
