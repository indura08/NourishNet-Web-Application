import React from 'react'
import icon from "../assets/log.png"
import './Header.css'

const Header: React.FC = () => {
  return (
    <>
        <div className='d-flex align-items-center justify-content-center bg-dark text-white'>
            #Lets End Hunger 2030
        </div>

        <nav className='navbar navbar-expand-lg mb-2'>
        <div className='container-fluid d-flex background'>
            <div className='mx-5 fs-5'>
                <img src={icon} className="iconImage"/>
                NourishNet
            </div>

            <div className='d-flex justify-content-center align-items-left'>
                
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item mx-4'>Home</li>
                        <li className='nav-item mx-4'>About us</li>
                        <li className='nav-item mx-4'>Donate</li>
                        <li className='nav-item mx-4'>Available Donations</li>
                    </ul>
            </div>

            <div className=''>
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item mx-4'>Home</li>
                    <li className='nav-item mx-4'>About us</li>    
                </ul>
            </div>
        </div>
    </nav>
    </>
    
  )
}

export default Header
