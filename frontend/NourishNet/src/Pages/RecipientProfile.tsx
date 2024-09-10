import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import card2 from "../assets/card2.png"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/MainStore'
import { logout } from "../Redux/RecipientSlice"
import { useNavigate } from 'react-router-dom'

const RecipientProfile:React.FC = () => {

    const { currentRecipient } = useSelector((state:RootState) => state.recipient);
    const { token } = useSelector((state: RootState) => state.recipient)
    const dispatch = useDispatch();
    console.log(currentRecipient);
    console.log(token)
    const navigate = useNavigate()
    const handleLogout = (): void => {
        dispatch(logout());
        navigate("/")
    }
  return (
    <>
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        </head>

        <Header></Header>
        
        <center><h1 className="mb-4 text-success">Welcome Recipient!!</h1></center>

        <div className='container-fluid d-flex border border-3 mb-4'>
            <div className='container-fluid border border-2 col-3 justify-content-center border-dark'>   
                <center><h4>Hello There {currentRecipient.recipientName} 👋</h4></center>
                <hr/>

                <div className='mt-4 d-flex'>
                    <div className='container-fluid border rounded-pill border-dark border-2 mx-2'>
                        <center>{currentRecipient.baseDistrict}</center>
                    </div>

                    <div className='container-fluid border rounded-pill border-dark border-2'>
                        <center>{currentRecipient.baseProvince}</center>
                    </div>
                    
                </div>
                <div className='mt-4'>
                    <h6 className='mb-4'>Recipient Name: {currentRecipient.recipientName}</h6>
                    <h6 className='mb-4'>Recipient Type: {currentRecipient.recipientType}</h6>
                    <h6 className='mb-4'>ContactPerson: {currentRecipient.contactPerson}</h6>
                    <h6 className='mb-4'>Phone:{currentRecipient.phone}</h6>
                    <h6 className='mb-4'>Address: {currentRecipient.address}</h6>
                    <h6 className='mb-4'>Email: {currentRecipient.email}</h6>
                </div>

                <div className='d-flex container-fluid mb-4'>
                    <button className='btn btn-success btn-custom mx-1'>Edit</button>
                    <button className='btn btn-danger btn-custom mx-1' onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div className='container-fluid border border-2 mx-1 col-6 fixed-size-scrollable border-dark'>
                <center><h3>Popular Donations </h3></center>
                <hr/>
                <div className='row'>
                    <div className="card mt-3 mb-3 mx-2" style={{width: "18rem"}}>
                        <img src={card2} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">FoodType Quanitity</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p>Expiry Date:</p>
                            <p>Phone:</p>
                            <p>Current status:</p>
                            <div className='d-flex justify-content-center'>
                                <a href="#" className="btn btn-success btn-custom mx-1">Edit</a>
                                <a href="#" className="btn btn-danger btn-custom mx-1">Delete</a>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3 mb-3" style={{width: "18rem"}}>
                        <img src={card2} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">FoodType Quanitity</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p>Expiry Date:</p>
                            <p>Phone:</p>
                            <p>Current status:</p>
                            <div className='d-flex justify-content-center'>
                                <a href="#" className="btn btn-success btn-custom mx-1">Edit</a>
                                <a href="#" className="btn btn-danger btn-custom mx-1">Delete</a>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3 mb-3" style={{width: "18rem"}}>
                        <img src={card2} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">FoodType Quanitity</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p>Expiry Date:</p>
                            <p>Phone:</p>
                            <p>Current status:</p>
                            <div className='d-flex justify-content-center'>
                                <a href="#" className="btn btn-success btn-custom mx-1">Edit</a>
                                <a href="#" className="btn btn-danger btn-custom mx-1">Delete</a>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3 mb-3" style={{width: "18rem"}}>
                        <img src={card2} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">FoodType Quanitity</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p>Expiry Date:</p>
                            <p>Phone:</p>
                            <p>Current status:</p>
                            <div className='d-flex justify-content-center'>
                                <a href="#" className="btn btn-success btn-custom mx-1">Edit</a>
                                <a href="#" className="btn btn-danger btn-custom mx-1">Delete</a>
                            </div>
                        </div>
                    </div>


                    <div className='d-flex container-fluid justify-content-center mb-4'>
                        <button className='btn btn-dark btn-custom'>See All Donations</button>
                    </div>
                </div>
            </div>

            <div className='border border-2 container-fluid col-3 fixed-size-scrollable border-dark'>
                <div className=''>
                    <center><h4>Notifications</h4></center>
                </div>
                <hr/>
                <div className='mt-3 d-flex'>
                    <div className='d-flex'>
                        <div>
                            <p style={{ fontSize:"15px"}}>your donation has been taken please contact the person now</p>
                        </div>
                        
                        <div>
                            <button className='btn btn-danger'><span className="material-symbols-outlined fs-5">delete</span></button>
                        </div> 
                    </div>
                </div>                
            </div>

        </div>

        <Footer></Footer>
    </>
  )
}

export default RecipientProfile
