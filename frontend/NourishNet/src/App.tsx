import './App.css'
import Home from './Pages/Home'
import DonorSignUp from './Pages/DonorSignUp'
import RecipientSignUp from './Pages/RecipientSignUp'
import DonorProfile from './Pages/DonorProfile'
import RecipientProfile from './Pages/RecipientProfile'
import FoodListsPage from './Pages/FoodListsPage'
import DonorLogin from './Pages/DonorLogin'
import RecipientLogin from './Pages/RecipientLogin'
import { BrowserRouter as Router , Routes,  Route,  } from "react-router-dom"

function App() {
  return (
    <>
      {/* <Home></Home> */}
      {/* <DonorSignUp></DonorSignUp> */}
      {/* <RecipientSignUp></RecipientSignUp> */}
      {/* <DonorProfile></DonorProfile> */}
      {/* <FoodListsPage></FoodListsPage> */}
      {/* <RecipientProfile></RecipientProfile> */}
      {/* <DonorLogin></DonorLogin> */}
      {/* <RecipientLogin></RecipientLogin> */}

      <Router>
        <Routes>
          <Route path = "/" element={<Home/>}/>     {/* responsive - done */}
          <Route path='/donor/profile' element={<DonorProfile/>}></Route> {/* responsive - done */}
          <Route path='/recipient/profile' element={<RecipientProfile/>}></Route> {/* responsive - done */}
          <Route path='/donor/login' element={<DonorLogin/>}></Route> {/* responsive - done */}
          <Route path='/recipient/login' element={<RecipientLogin/>}></Route> {/* responsive - done */}
          <Route path='/donor/register' element={<DonorSignUp/>}></Route> {/* responsive - done */}
          <Route path='/recipient/register' element={<RecipientSignUp/>}></Route> {/* responsive - done */}
          <Route path='/foodlists' element={<FoodListsPage/>}></Route> {/* responsive - done */}
        </Routes>
      </Router>
    </>
  )
}

export default App
