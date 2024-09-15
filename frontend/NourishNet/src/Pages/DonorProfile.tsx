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
import { District } from '../../Models/Enums/DistrictValue'
import { Province } from '../../Models/Enums/ProvinceValue'
import { Role } from '../../Models/Enums/Role'
import { FoodType } from '../../Models/Enums/FoodType'
import { FoodListingStatus } from '../../Models/Enums/FoodListingStatus'
import { NotificationDonor } from '../../Models/NotificationDonor'

const DonorProfile: React.FC = () => {

    const { currentDonor , dtoken } = useSelector((state:RootState) => state.donor)
    const [ foodlistings , setFoolistings ] = useState<FoodListing[]>([])
    const [usersFoodLisitngs , setUsersfoodListings] = useState<FoodListing[]>([]);
    const [filteredNotification , setFilteredNotification] = useState<NotificationDonor[]>([]);
    const [ notificationList , setNotificationList] = useState<NotificationDonor[]>([]);
    const [currentfoodListing , setCurrentFoodListing] = useState<FoodListing>({
        id: 0,
        donorId : "", 
        donor: {
            id:"",
            organizaTionName:"", 
            organizationType: "", 
            contactPerson:"",
            phone: "",
            baseDistrict: District.COLOMBO,
            baseProvince: Province.WESTERN, 
            address: "",
            operatingHours: "", 
            email: "", 
            password: "", 
            confirmPassword: "", 
            userName: "",
            role: Role.Donor, 
            userType: ""
        },
        foodType: FoodType.Dishes,
        description : "",
        quantity: 0,
        postedDate: "",
        expiryDate: "",
        imagePath: "",
        currentStatus: FoodListingStatus.Available
    });

    const [newDonation , setNewDonation] = useState<FoodListing>({
        id: 0,
        donorId : currentDonor.id, 
        donor: currentDonor ? currentDonor : {
            id:"",
            organizaTionName:"", 
            organizationType: "", 
            contactPerson:"",
            phone: "",
            baseDistrict: District.COLOMBO,
            baseProvince: Province.WESTERN, 
            address: "",
            operatingHours: "", 
            email: "", 
            password: "", 
            confirmPassword: "", 
            userName: "",
            role: Role.Donor, 
            userType: ""
        },
        foodType: FoodType.Dishes,
        description : "",
        quantity: 0,
        postedDate: "",
        expiryDate: "",
        imagePath: "",
        currentStatus: FoodListingStatus.Available
    });
    // const [ error , setError] = useState("")

    const [ currentNotification , setCurrentNotification ] = useState({
        id: 0,
        donorId: currentfoodListing.donorId,
        donor: currentfoodListing.donor,
        description: "",
        createdDate: "",
        createtime: ""
    });

    const dispatch = useDispatch()
    const navigate = useNavigate() 
    // console.log(currentDonor)
    // console.log(dtoken)

    const handleLogout = ():void => {
        dispatch(logout())
        navigate("/")
    }

    const handleSubmit = ():void => {
        try {
            const res = axios.put(`http://localhost:5223/api/FoodListing/update/${currentfoodListing.id}` , currentfoodListing, {
                headers: {
                    Authorization: `Bearer ${dtoken}`
                }
            })
            console.log(res);
        }catch(error){
            console.log("error occured" + error)
        }
    }
    
    const fetchFoodListings = async () : Promise<void> => {
        try {
            const res = await axios.get("http://localhost:5223/api/FoodListing/all" , {
                headers : {
                    Authorization: `Bearer ${dtoken}`
                }
            })
            setFoolistings(res.data)
            setUsersfoodListings(foodlistings.filter(listing => listing.donor.id == currentDonor.id))
            
        }catch(error){
            console.log(error)
            throw error;
        }
    }

    const editdonorProfile = (): void => {
        try {
            const res =  axios.put(`http://localhost:5223/api/Donor/update/${currentDonor.id}` , currentDonor, {
                headers: {
                    Authorization: dtoken ? `Bearer ${dtoken}` : ""
                }
            } )
            console.log(res)
        }catch(error){
            console.log("error occured " + error)
        }
    }

    const handledelete = async (): Promise<void> => {
        try {
            const res = axios.delete(`http://localhost:5223/api/FoodListing/delete/${currentfoodListing.id}` , {
                headers: {
                    Authorization: `Bearer ${dtoken}`
                }
            })
            console.log(res)
            console.log(currentfoodListing)
        }catch(error){
            alert(`error occured ${error}`)
        }
    } 

    const createNewdonation = (e: React.FormEvent<HTMLFormElement>): void => {
        try {
            const res = axios.post("http://localhost:5223/api/FoodListing/create" , newDonation, {
                headers: {
                    Authorization: dtoken ? `Bearer ${dtoken}` : ""
                }
            })
            console.log(res);
        }catch(error){
            console.log(`error occured : ${error}`)
            throw error
        }
    }

    const fetchNotifications = async () => {
        //vackend eke me controller ekt access krnna puluwan donrati admin ta withrk wenn hdnna 
        try {
            const res = axios.get("http://localhost:5223/api/NotificationDonor/all")
            console.log((await res).data)
            setNotificationList((await res).data);
            setFilteredNotification(notificationList.filter(notification => notification.donorId == currentDonor.id));
        }catch(error){
            console.log(error)
        }
    }

    const deleteNotification = () => {
        try {
            const res = axios.delete(`http://localhost:5223/api/NotificationDonor/delete/${currentNotification.id}`)
            console.log(res)
        }catch(error){
            console.log(error);
        }
    } 

    // const giveApprovetoRecipient = async () =>{
    //     try {
    //         const res = axios.post("http://localhost:5223/api/NotificationRecipient/create")
    //     }
    // } 

    useEffect(() => {
        fetchFoodListings();
        fetchNotifications();
    })
    
  return (
    <>
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
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
                    <button className='btn btn-success btn-custom mx-1 text-white' data-bs-toggle="modal" data-bs-target="#edit">Edit</button>
                    <button className='btn btn-danger btn-custom mx-1 text-white' onClick={handleLogout}>{currentDonor.id === "" || currentDonor.id === null || currentDonor.id === undefined  ? "Login" : "Logout"}</button>
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
                                <button className="btn btn-success btn-custom mx-1 text-white" onClick={() => setCurrentFoodListing(listing)} data-bs-toggle="modal" data-bs-target="#editDonation">Edit</button>
                                <button className="btn btn-danger btn-custom mx-1 text-white" onClick={() => setCurrentFoodListing(listing)} data-bs-toggle="modal" data-bs-target="#delete">Delete</button>
                            </div>
                        </div>
                    </div>
                    ))}

                </div>
            </div>

            <div className='border border-2 container-fluid col-3 fixed-size-scrollable border-dark'>
                <div className=''>
                    <center><h4>Notifications</h4></center>
                </div>
                <hr/>
                <div className='mt-3 d-flex'>
                    <div className='row'>
                        { filteredNotification.map((notification:NotificationDonor) => (
                            <div className='border border-2 mb-1'>
                                <p style={{ fontSize:"15px"}} className='fw-bold'>{notification.description}</p>
                                <div className='d-flex flex-row'>
                                    <p style={{ fontSize:"12px"}} className='mx-1'>{notification.createdDate} </p>
                                    <p style={{ fontSize:"12px"}} className='mx-1'>{notification.createtime} </p>
                                    <div style={{marginLeft:"48px"}} className="d-flex">
                                        <button className='btn btn-danger button-custom d-flex align-items-center justify-content-center mx-1' data-bs-toggle="modal" data-bs-target="#deleteNotification" onClick={() => setCurrentNotification(notification)}><span className="material-symbols-outlined fs-6">delete</span></button>
                                        <button className='btn btn-dark button-custom d-flex align-items-center justify-content-center mx-1' data-bs-toggle="modal" data-bs-target="#Confrimartion" onClick={() => setCurrentNotification(notification)}><span className="material-symbols-outlined fs-6">check_circle</span></button>
                                    </div>
                                </div>
                            </div>
                        ))}
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

                        <form className='mx-4 mt-5' onSubmit={createNewdonation}>
                            <div className="mb-3 row">
                                <input type="text" className="form-control input-type-custom col mx-1" name='DonorId' placeholder={currentDonor.userName} readOnly />
                                <input type="text" className="form-control input-type-custom col mx-1" name='FoodType' placeholder='FoodType' onChange={(e) => newDonation.foodType = e.target.value}/>
                            </div>

                            <div className="mb-3 row">
                                <input type="text" className="form-control input-type-custom col mx-1" name='Description' placeholder='Description' onChange={(e) => newDonation.description = e.target.value}/>
                                <input type="text" className="form-control input-type-custom col mx-1" name='Quantity' placeholder='Quantity (kg)' onChange={(e) => newDonation.quantity = e.target.value}/>
                            </div>

                            <div className="mb-3 row">
                                <input type="text" className="form-control input-type-custom col mx-1" name='PostedDate' placeholder='PostedDate (DD/MM/YYYY)' onChange={(e) => newDonation.postedDate = e.target.value}/>
                                <input type="text" className="form-control input-type-custom col mx-1" name='ExpiryDate' placeholder='ExpiryDate (DD/MM/YYYY)' onChange={(e) => newDonation.expiryDate = e.target.value}/>
                            </div>

                            <div className="mb-3 row">
                                <input type="text" className="form-control input-type-custom col mx-1" name='ImagePath' placeholder='ImagePath' onChange={(e) => newDonation.imagePath = e.target.value}/>
                                <input type="text" className="form-control input-type-custom col mx-1 " name='CurrentStatus' placeholder="Available" readOnly/>
                            </div>
                            
                            <div className="form-check col checkbox-div mb-3">
                                <input type="checkbox" className="form-check-input border border-dark border-2 input-type-custom" name="checkbox1" id="exampleCheck1"/>
                                <label className="form-check-label">I aggree to terms and conditions</label><a href="#">Terms and conditions</a> 
                            </div>

                            <div>
                                <p className="mb-3 fw-normal">Are you a Recipient?<a href=""><span>Register as Recipient</span></a></p> 
                            </div>

                            <div className="row mb-3">
                                <button type="submit" className="btn btn-success col mx-1">Create Donation</button>
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

        {/* edit user profile modal*/}
        <div className="modal" id='edit'>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Your Donor profile</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className='mx-4' onSubmit={editdonorProfile}>
                        <div className="mb-3 row">
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.organizaTionName} placeholder={currentDonor.organizaTionName} onChange={(e) => currentDonor.organizaTionName = e.target.value}/>
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.organizationType}  placeholder={currentDonor.organizationType} onChange={(e) => currentDonor.organizationType = e.target.value}/>
                        </div>

                        <div className="mb-3 row">
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.contactPerson}  placeholder={currentDonor.contactPerson} onChange={(e) => currentDonor.contactPerson = e.target.value}/>
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.phone} placeholder={currentDonor.phone} onChange={(e) => currentDonor.phone = e.target.value}/>
                        </div>

                        <div className="mb-3 row">
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.baseDistrict} placeholder={currentDonor.baseDistrict} onChange={(e) => currentDonor.baseDistrict = e.target.value}/>
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.baseProvince} placeholder={currentDonor.baseProvince} onChange={(e) => currentDonor.baseProvince = e.target.value}/>
                        </div>

                        <div className="mb-3 row">
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.address} placeholder={currentDonor.address} onChange={(e) => currentDonor.address = e.target.value}/>
                            <input type="text" className="form-control input-type-custom col mx-1 " name={currentDonor.userType} placeholder={currentDonor.userType} readOnly/>
                        </div>

                        <div className="mb-3 row">
                            <input type="email" className="form-control input-type-custom col mx-1" name={currentDonor.email} placeholder={currentDonor.email} onChange={(e) => currentDonor.email = e.target.value}/>
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.operatingHours} placeholder={currentDonor.operatingHours} onChange={(e) => currentDonor.operatingHours = e.target.value}/>
                        </div>

                        <div className="mb-3 row">
                            <input type="password" className="form-control input-type-custom col mx-1" name={currentDonor.password}  placeholder="You cant change your password here" />
                            <input type="password" className="form-control input-type-custom col mx-1" name={currentDonor.confirmPassword} placeholder="(Try changin password in userManagement Page)"/>
                        </div>

                        <div className="mb-3 row">
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.userName} placeholder={currentDonor.userName} onChange={(e) => currentDonor.userName = e.target.value}/>
                            <input type="text" className="form-control input-type-custom col mx-1" name={currentDonor.role} placeholder={currentDonor.role} readOnly/>
                        </div>

                        <div className="row mb-3">
                            <button type="submit" className="btn btn-success col mx-1">Update</button>
                            <button type="reset" className="btn btn-danger col">Reset Form</button>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        {/* edit  donation modal*/}
        <div className="modal" id='editDonation'>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Your Donation Information</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='mx-4' onClick={handleSubmit}>
                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name={currentfoodListing.donor.userName} placeholder={currentfoodListing.donor.userName} readOnly/>
                                    <input type="text" className="form-control input-type-custom col mx-1" name={currentfoodListing.foodType} placeholder={currentfoodListing.foodType} 
                                        onChange={(e) => currentfoodListing.foodType == e.target.value}/>
                                </div>

                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name={currentfoodListing.description} placeholder={currentfoodListing.description} onChange={(e) => currentfoodListing.description = e.target.value}/>
                                    <input type="number" className="form-control input-type-custom col mx-1" name={currentfoodListing.quantity} placeholder={currentfoodListing.quantity} onChange={(e) => currentfoodListing.quantity = Number(e.target.value)}/>
                                </div>

                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name={currentfoodListing.postedDate} placeholder={currentfoodListing.postedDate} onChange={(e) => currentfoodListing.postedDate = e.target.value}/>
                                    <input type="text" className="form-control input-type-custom col mx-1" name={currentfoodListing.expiryDate} placeholder={currentfoodListing.expiryDate} onChange={(e) => currentfoodListing.expiryDate = e.target.value}/>
                                </div>

                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name={currentfoodListing.imagePath} placeholder={currentfoodListing.imagePath} onChange={(e) => currentfoodListing.imagePath = e.target.value}/>
                                    <input type="text" className="form-control input-type-custom col mx-1 " name={currentfoodListing.currentStatus} placeholder={currentfoodListing.currentStatus} readOnly/>
                                </div>

                                <div className="row mb-3">
                                    <button type="submit" className="btn btn-success col mx-1">Update</button>
                                    <button type="reset" className="btn btn-danger col">Reset</button>
                                </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

            {/* delete modal */}
            <div className="modal" id='delete'>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this ?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={() => handledelete()}>Delete</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

            {/* delete notification*/}
            <div className="modal" id='deleteNotification'>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Notification?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this notification?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={() => deleteNotification()}>Delete</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

            {/* confirmation */}
            <div className="modal" id='Confrimartion'>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confrim donation?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>are you sure you want to confirm the donation?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={() => deleteNotification()}>Delete</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

    </>
  )
}

export default DonorProfile
