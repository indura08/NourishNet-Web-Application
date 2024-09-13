import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import "./DonorProfile.css"
import card2 from "../assets/card2.png"
import cover2 from "../assets/cover4.png"
import donation from "../assets/donation1.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/MainStore'
import { logout } from '../Redux/DonorSlice'
import { useNavigate } from 'react-router-dom'
import { FoodListing } from '../../Models/FoodListing'
import axios from 'axios'

const DonorProfile: React.FC = () => {

    const { currentDonor , dtoken } = useSelector((state:RootState) => state.donor)
    const [ foodlistings , setFoolistings ] = useState<FoodListing[]>([])
    const [usersFoodLisitngs , setUsersfoodListings] = useState<FoodListing[]>([]);

    const dispatch = useDispatch()
    const navigate = useNavigate() 
    console.log(currentDonor)
    console.log(dtoken)

    const handleLogout = ():void => {
        dispatch(logout())
        navigate("/")
    }
    
    const fetchFoodListings = async () : Promise<void> => {
        try {
            const res = await axios.get("http://localhost:5223/api/FoodListing/all" , {
                headers : {
                    Authorization: dtoken ? `Bearer ${dtoken}` : ""
                }
            })
            setFoolistings(res.data)
            setUsersfoodListings(foodlistings.filter(listing => listing.donor.id == currentDonor.id))
            
        }catch(error){
            console.log(error)
            throw error;
        }
    }

    useEffect(() => {
        fetchFoodListings();
    })

  return (
    <>
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        </head>
        <Header></Header>

        <center><h1 className="mb-4 text-success">Welcome Donor, You contribution values more than you think!!</h1></center>

        <div className='container-fluid d-flex border border-3 mb-4'>
            <div className='container-fluid border border-2 col-3 justify-content-center border-dark'>   
                <center><h4>Hello There {currentDonor.userName} 👋</h4></center>
                <hr/>

                <div className='mt-4 d-flex'>
                    <div className='container-fluid border rounded-pill border-dark border-2 mx-2'>
                        <center>{currentDonor.baseDistrict ? currentDonor.baseDistrict : "login to see"}</center>
                    </div>

                    <div className='container-fluid border rounded-pill border-dark border-2'>
                        <center>{currentDonor.baseProvince ? currentDonor.baseProvince : "login to see"}</center>
                    </div>
                    
                </div>
                <div className='mt-4'>
                    <h6 className='mb-4'>Org. Name: {currentDonor.organizaTionName}</h6>
                    <h6 className='mb-4'>Org. Type: {currentDonor.organizationType}</h6>
                    <h6 className='mb-4'>ContactPerson: {currentDonor.contactPerson}</h6>
                    <h6 className='mb-4'>Phone: {currentDonor.phone}</h6>
                    <h6 className='mb-4'>Address: {currentDonor.address}</h6>
                </div>

                <div className='d-flex container-fluid mb-4'>
                    <button className='btn btn-success btn-custom mx-1'>Edit</button>
                    <button className='btn btn-danger btn-custom mx-1' onClick={handleLogout}>{currentDonor.id === "" || currentDonor.id === null || currentDonor.id === undefined  ? "Login" : "Logout"}</button>
                </div>
            </div>

            <div className='container-fluid border border-2 mx-1 col-6 fixed-size-scrollable border-dark'>
                <center><h3>Donations You Made</h3></center>
                <hr/>
                <div className='row'>
                    { usersFoodLisitngs.map((listing:FoodListing) => (
                        <div key={listing.id} className="card mt-3 mb-3 mx-1" style={{width: "18rem"}}>
                        <img src={card2} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <center><h5 className="card-title">{listing.foodType}</h5></center>
                            <p className="card-text">{listing.description}</p>
                            <p>Expiry Date: {listing.expiryDate}</p>
                            <p>Quantity: {listing.quantity}</p>
                            <p>Current status: <span className='text-dark fw-bolder'>{listing.currentStatus}</span></p>
                            <p>Donor : {listing.donor.userName}</p>
                            <p>Donor contact : {listing.donor.phone}</p>
                            <div className='d-flex justify-content-center'>
                                <a href="#" className="btn btn-success btn-custom mx-1">Edit</a>
                                <a href="#" className="btn btn-danger btn-custom mx-1">Delete</a>
                            </div>
                        </div>
                    </div>
                    ))}
                    {/* <div className="card mt-3 mb-3" style={{width: "18rem"}}>
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
                    </div>                     */}
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

        <hr/>

        <div className='d-flex container-fluid flex-column'>
            <div className='container-fluid mb-4'>
                <center><h1>Make a New donation</h1></center>
            </div> 

            <div className='container-fluid d-flex flex-column '>

                <div className='d-flex'>
                    <div className='w-50 mb-4 d-flex justify-content-center'>
                        <img src={donation} style={{width:"100%", height:"35rem"}} />
                    </div>

                    <div className='div-custom-margin border rounded-5 w-50 py-2 justify-content-center border mb-4 border-dark border-3 main-div-margin'>
                        <center><h3>Simply Fill This Food Listing form</h3></center>

                        <form className='mx-4 mt-5'>
                            <div className="mb-3 row">
                                <input type="text" className="form-control input-type-custom col mx-1" name='Donor' placeholder='Donor'/>
                                <input type="text" className="form-control input-type-custom col mx-1" name='FoodType' placeholder='FoodType'/>
                            </div>

                            <div className="mb-3 row">
                                <input type="email" className="form-control input-type-custom col mx-1" name='Description' placeholder='Description' />
                                <input type="password" className="form-control input-type-custom col mx-1" name='Quantity' placeholder='Quantity (kg)'/>
                            </div>

                            <div className="mb-3 row">
                                <input type="email" className="form-control input-type-custom col mx-1" name='PostedDate' placeholder='PostedDate (DD/MM/YYYY)'/>
                                <input type="password" className="form-control input-type-custom col mx-1" name='ExpiryDate' placeholder='ExpiryDate (DD/MM/YYYY)'/>
                            </div>

                            <div className="mb-3 row">
                                <input type="email" className="form-control input-type-custom col mx-1" name='ImagePath' placeholder='ImagePath'/>
                                <input type="password" className="form-control input-type-custom col mx-1 " name='CurrentStatus' placeholder='CurrentStatus'/>
                            </div>
                            
                            <div className="form-check col checkbox-div mb-3">
                                <input type="checkbox" className="form-check-input border border-dark border-2 input-type-custom" name="checkbox1" id="exampleCheck1"/>
                                <label className="form-check-label">I aggree to terms and conditions</label><a href="#">Terms and conditions</a> 
                            </div>

                            <div>
                                <p className="mb-3 fw-normal">Are you a Recipient?<a href=""><span>Register as Recipient</span></a></p> 
                            </div>

                            <div className="row mb-3">
                                <button type="submit" className="btn btn-success col mx-1">Register</button>
                                <button type="reset" className="btn btn-danger col">Reset Form</button>
                            </div>

                            <div className='d-flex container-fluid justify-content-center'>
                                <h4 className='text-success'>Help Change in the world!</h4><br/>
                            </div>

                            <div className=''>
                                <img src={cover2} className='img-custom border border-white rounded-5'/>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
        <Footer></Footer>
    </>
  )
}

export default DonorProfile
