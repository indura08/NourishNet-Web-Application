import React from 'react'
import icon from "../assets/log.png"
import './Header.css'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/MainStore'

const Header: React.FC = () => {

    const { currentDonor } = useSelector((state:RootState) => state.donor);
    const { currentRecipient } = useSelector((state:RootState) => state.recipient);


  return (
    <>
        <div className='d-flex align-items-center justify-content-center bg-dark text-white'>
            #Lets End Hunger 2030
        </div>

        <nav className='navbar navbar-expand-lg mb-2'>
        <div className='container-fluid d-flex background'>
            <div className='mx-5 fs-5'>
                <img src={icon} className="iconImage"/>
                <span className='fw-bolder'>NourishNet</span>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"> 
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className='collapse navbar-collapse' id='navmenu'>
                
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item mx-4'><a href='/' style={{color:"inherit", textDecoration:"none"}}>Home</a></li>
                        <li className='nav-item mx-4'><a href='' style={{color:"inherit", textDecoration:"none"}}>About us</a></li>
                        { currentDonor ? <li className='nav-item mx-4'><a href='/donor/profile' style={{color:"inherit", textDecoration:"none"}}>Donate</a></li> : <li className='nav-item mx-4'><a href='/donor/login' style={{color:"inherit", textDecoration:"none"}}>Donate</a></li>}
                        <li className='nav-item mx-4'><a href='/foodlists' style={{color:"inherit", textDecoration:"none"}}>Available Donations</a></li>
                    </ul>
            </div>

            <div className='d-none d-md-block' style={{marginLeft: "60px"}} id='navmenu'>
                <ul className='navbar-nav ms-auto'>
                    { currentDonor.id != String(0)  && currentRecipient.id == String(0) ? <li className='nav-item mx-4'><a href='/donor/profile' style={{color:"inherit", textDecoration:"none"}}>{currentDonor.userName}</a></li> : 
                        currentRecipient.id != String(0) && currentDonor.id == String(0) ? <li className='nav-item mx-4'><a href='/recipient/profile' style={{color:"inherit", textDecoration:"none"}}>{currentRecipient.userName}</a></li> :
                        currentDonor.id != String(0) && currentRecipient.id != String(0) ? <div><li className='nav-item mx-4'><a href='/donor/profile' style={{color:"inherit", textDecoration:"none"}}>Donor Account</a></li> 
                                                                                                <li className='nav-item mx-4'><a href='/recipient/profile' style={{color:"inherit", textDecoration:"none"}}>Recipient Account</a></li></div> : currentDonor.id == String(0) && currentRecipient.id == String(0) ? <li className='nav-item mx-4'><a href='/donor/register' style={{color:"inherit", textDecoration:"none"}}>Sign In</a></li>  
                                                                                                : "Hi"}    
                    <li className='nav-item mx-4'><a href='/donor/register' style={{color:"inherit", textDecoration:"none"}}>Sign Up</a></li>
                </ul>     
            </div>
        </div>
    </nav>     
    </>
    
  )
}

export default Header
