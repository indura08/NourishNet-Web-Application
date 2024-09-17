import React, { useEffect, useState } from 'react'
import "./RecipientProfile.css"
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import card2 from "../assets/card2.png"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/MainStore'
import { logout } from "../Redux/RecipientSlice"
import { useNavigate } from 'react-router-dom'
import { FoodListing } from '../../Models/FoodListing'
import axios from 'axios'
import { District } from '../../Models/Enums/DistrictValue'
import { Province } from '../../Models/Enums/ProvinceValue'
import { Role } from '../../Models/Enums/Role'
import { FoodType } from '../../Models/Enums/FoodType'
import { FoodListingStatus } from '../../Models/Enums/FoodListingStatus'
import { NotificationDonor } from '../../Models/NotificationDonor'
import { NotificationRecipient } from '../../Models/NotificationRecipient'
import { DonationHistory } from "../../Models/DonationHistory";

const RecipientProfile: React.FC = () => {

    const { currentRecipient } = useSelector((state: RootState) => state.recipient);
    const { rtoken } = useSelector((state: RootState) => state.recipient);
    const dispatch = useDispatch();
    const [ recipientNotificationList , setRecipientNotificationList] = useState<NotificationRecipient[]>([]);
    const [ currentRecipientNotification , setCurrentRecipientNotification ] = useState<NotificationRecipient[]>([]);
    const [ selectedNotification , setSelectedNotification] = useState({
        id: 0,
        recipientId: currentRecipient.id,
        recipient: currentRecipient,
        description: "",
        createdDate: "",
        createdTime: ""
    });
    console.log(currentRecipient);

    const [updatedRecipiet, setUpdatedRecipient] = useState({
        id: currentRecipient.id,
        recipientName: currentRecipient.recipientName,
        recipientType: currentRecipient.recipientType,
        contactPerson: currentRecipient.contactPerson,
        phone: currentRecipient.phone,
        baseDistrict: currentRecipient.baseDistrict,
        baseProvince: currentRecipient.baseProvince,
        address: currentRecipient.address,
        email: currentRecipient.email,
        userName: currentRecipient.userName,
        password: "",
        confirmPassword: "",
        role: currentRecipient.role,
        userType: currentRecipient.userType
    })

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        try {
            const res = axios.put(`http://localhost:5223/api/Recipient/update/${currentRecipient.id}`, currentRecipient, {
                headers: {
                    Authorization: `Bearer ${rtoken}`
                }
            })
            console.log((await res).data);
            console.log(updatedRecipiet)
        } catch (error) {
            console.log()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedRecipient((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [currentfoodListing, setCurrentFoodListing] = useState<FoodListing>({
        id: 0,
        donorId: "",
        donor: {
            id: "",
            organizaTionName: "",
            organizationType: "",
            contactPerson: "",
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
        description: "",
        quantity: 0,
        postedDate: "",
        expiryDate: "",
        imagePath: "",
        currentStatus: FoodListingStatus.Available
    });

    const [foodListings, setFoodListings] = useState<FoodListing[]>([])

    const navigate = useNavigate()

    const handleLogout = (): void => {
        dispatch(logout());
        navigate("/")
    }

    const fetchFoodListings = async (): Promise<void> => {
        try {
            const res = axios.get("http://localhost:5223/api/FoodListing/all", {
                headers: {
                    Authorization: `Bearer ${rtoken}`
                }
            })
            setFoodListings((await res).data);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const today = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const newRecipientNotification : NotificationRecipient = {
        id: 0,
        recipientId: currentRecipient.id,
        recipient: currentRecipient,
        description: `You have applied to "${currentfoodListing.description}" Donation. 
                        Now you can contact the donor. tele: ${currentfoodListing.donor.phone}`,
        createdDate: today.toString(),
        createdTime: time.toString()
    }

    const donationApplyNotification : NotificationDonor = {
        id: 0,
        donorId: currentfoodListing.donorId,
        donor: currentfoodListing.donor,
        description: `Your donation "${currentfoodListing.description}" has been applied by "${currentRecipient.userName}".
                        please contact them now: ${currentRecipient.phone}`,
        createdDate: today.toString(),
        createtime: time.toString()
    }

    const confrimationDonorNotification : NotificationDonor = {
        id: 0,
        donorId: currentfoodListing.donorId,
        donor: currentfoodListing.donor,
        description: `You donation has been confrimed by th recipient ${currentRecipient.userName}`,
        createdDate: today.toString(),
        createtime: time.toString()
    }

    const confrimationRecipientNotification : NotificationRecipient = {
        id: 0,
        recipientId: currentRecipient.id,
        recipient: currentRecipient,
        description: `You have confrimed a donation you just got from`,
        createdDate: today.toString(),
        createdTime: time.toString()
    }

    const notificationCreation = (NotificationDonor:NotificationDonor) => {
        try {
            const responseNotification = axios.post("http://localhost:5223/api/NotificationDonor/create" , NotificationDonor);
            console.log(responseNotification);
        }catch (error){
            console.log(`Error occured and the error is : ${error}`);
        }
    }

    const recipientNotificationCreation = (notificationRecipient : NotificationRecipient) => {
        try {
            const responseNotification = axios.post("http://localhost:5223/api/NotificationRecipient/create" , notificationRecipient);
            console.log(responseNotification);
        }catch (error){
            console.log(`Error occured and the error is : ${error}`);
        }
    }

    const applyFunction = (): void => {
        currentfoodListing.currentStatus = FoodListingStatus.Claimed;
        try {
            const res = axios.put(`http://localhost:5223/api/FoodListing/update/${currentfoodListing.id}`, currentfoodListing, {
                headers: {
                    Authorization: `Bearer ${rtoken}`
                }
            })
            notificationCreation(donationApplyNotification);
            recipientNotificationCreation(newRecipientNotification);
            console.log(res);
            console.log(currentfoodListing);
        } catch (error) {
            console.log("error occured" + error)
        }
    }

    const fetchNotification = async () => {
        try {
            const res = axios.get("http://localhost:5223/api/NotificationRecipient/all")
            setRecipientNotificationList((await res).data)
            setCurrentRecipientNotification(recipientNotificationList.filter(notification => notification.recipientId == currentRecipient.id))
        }catch(error){
            console.log(`error occured : ${error}`);
        }
    }

    const handlenavigation = () => {
        navigate("/foodlists")
    }

    const deleteNotification = () => {
        try {
            const res = axios.delete(`http://localhost:5223/api/NotificationRecipient/delete/${selectedNotification.id}`)
            console.log(res)
        }catch(error){
            console.log(error);
        }
    } 

    const newDonationHistory:DonationHistory = ({
        donationId: 0 ,
        recipientId: currentRecipient.id,
        recipient: currentRecipient,
        foodListingId: null,
        foodListing: null,
        dataRecieved: today 
    })

    const createDonationHistory = () => {
        const res = axios.post("http://localhost:5223/api/DonationHistory/create" , newDonationHistory , {
            headers: {
                Authorization: `Bearer ${rtoken}`
            }
        }
    ).then(() => {
            console.log(res)
            notificationCreation(confrimationDonorNotification);
            recipientNotificationCreation(confrimationRecipientNotification);
        }).catch((error) => {
            console.log(error);
            notificationCreation(confrimationDonorNotification);
            recipientNotificationCreation(confrimationRecipientNotification);
        })
    }

    useEffect(() => {
        fetchFoodListings();
        fetchNotification();
    })

    return (
        <>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            </head>

            <Header></Header>

            <center><h1 className="mb-4 text-success">Welcome Recipient!!</h1></center>

            <div className='container-fluid d-flex flex-column flex-md-row border border-3 mb-4'>
                <div className='container-fluid border border-2 col-12 col-md-3 mb-3 mb-md-0 justify-content-center border-dark'>
                    <center><h4>Hello There {currentRecipient.recipientName} 👋</h4></center>
                    <hr />

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
                        <button className='btn btn-success btn-custom mx-1' data-bs-toggle="modal" data-bs-target="#editProfile">Edit</button>
                        <button className='btn btn-danger btn-custom mx-1' onClick={handleLogout}>{currentRecipient.id === "" || currentRecipient.id === null || currentRecipient.id === undefined ? "Login" : "Logout"}</button>
                    </div>
                </div>

                <div className='container-fluid border border-2 mx-1 col-12 col-md-6 mb-3 mb-md-0 custom-height border-dark'>
                    <center><h3>Popular Donations </h3></center>
                    <hr />
                    <div className='row'>
                        {foodListings.map((listing: FoodListing) => (
                            <div key={listing.id} className="card mt-3 mb-3 mx-1" style={{ width: "18rem" }}>
                                <img src={card2} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <center><h5 className="card-title">{listing.foodType}</h5></center>
                                    <p className="card-text">{listing.description}</p>
                                    <p>Expiry Date: {listing.expiryDate}</p>
                                    <p>Quantity: {listing.quantity}</p>
                                    <p>Current status: <span className='text-dark fw-bolder'>{listing.currentStatus}</span></p>
                                    <p>Donor : {listing.donor.userName}</p>
                                    <p>Donor contact : {listing.donor.phone}</p>
                                    <div className='d-flex justify-content-center'>
                                        <button className="btn btn-warning btn-custom mx-1" data-bs-toggle="modal" data-bs-target="#report">Report</button>
                                        { listing.currentStatus == FoodListingStatus.Available ? <button className="btn btn-primary text-white btn-custom mx-1" data-bs-toggle="modal" data-bs-target="#apply" onClick={() => setCurrentFoodListing(listing)}>Apply</button> : <button className="btn btn-primary text-white btn-custom mx-1" disabled>Apply</button>}
                                    </div>
                                </div>
                            </div>
                        ))}


                        <div className='d-flex container-fluid justify-content-center mb-4'>
                            <button className='btn btn-dark text-white btn-custom' onClick={handlenavigation}>See All Donations</button>
                        </div>
                    </div>
                </div>

                <div className='border border-2 container-fluid col-12 col-md-3 custom-heights border-dark'>
                    <div className=''>
                        <center><h4>Notifications</h4></center>
                    </div>
                    <hr />
                    <div className='mt-3 d-flex'>
                    <div className='row'>
                        { currentRecipientNotification.map((notification:NotificationRecipient) => (
                            <div className='border border-2 mb-1'>
                                <p style={{ fontSize:"15px"}} className='fw-bold'>{notification.description}</p>
                                <div className='d-flex flex-row'>
                                    <p style={{ fontSize:"12px"}} className='mx-1'>{notification.createdDate} </p>
                                    <p style={{ fontSize:"12px"}} className='mx-1'>{notification.createdTime} </p>
                                    <div style={{marginLeft:"48px"}} className="d-flex">
                                        <button className='btn btn-danger button-custom d-flex align-items-center justify-content-center mx-1' data-bs-toggle="modal" data-bs-target="#deleteNotification" onClick={() => setSelectedNotification(notification)}><span className="material-symbols-outlined fs-6">delete</span></button>
                                        <button className='btn btn-primary button-custom d-flex align-items-center justify-content-center mx-1' data-bs-toggle="modal" data-bs-target="#confrimation" onClick={() => setSelectedNotification(notification)}><span className="material-symbols-outlined fs-6">check_circle</span></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>

            </div>

            {/* report modal*/}
            <div className="modal" id='report'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Report Something</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>What do you want to report?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Report</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* apply modal */}
            <div className="modal" id='apply'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Apply For this donation?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Click apply button to apply for this donation. After that contact the Donor to get the donation!</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={() => applyFunction()}>Apply</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id='editProfile'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Your Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='mx-4' onSubmit={handleUpdate}>
                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name='RecipientName' placeholder='RecipientName' onChange={handleInputChange} />
                                    <input type="text" className="form-control input-type-custom col mx-1" name='RecipientType' placeholder='RecipientType' onChange={handleInputChange} />
                                </div>

                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name='ContactPerson' placeholder='ContactPerson' onChange={handleInputChange} />
                                    <input type="text" className="form-control input-type-custom col mx-1" name='Phone' placeholder='Phone' onChange={handleInputChange} />
                                </div>

                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name='BaseDistrict' placeholder='BaseDistrict' onChange={handleInputChange} />
                                    <input type="text" className="form-control input-type-custom col mx-1" name='BaseProvince' placeholder='BaseProvince' onChange={handleInputChange} />
                                </div>

                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name='Address' placeholder='Address' onChange={handleInputChange} />
                                    <input type="text" className="form-control input-type-custom col mx-1 " name='UserType' placeholder='UserType' readOnly />
                                </div>

                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name='Email' placeholder='Email' onChange={handleInputChange} />
                                    <input type="text" className="form-control input-type-custom col mx-1" name='UserName' placeholder='UserName' onChange={handleInputChange} />
                                </div>

                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name='Password' placeholder='Password' readOnly />
                                    <input type="text" className="form-control input-type-custom col mx-1" name='ConfirmPassword' placeholder='ConfirmPassword' readOnly />
                                </div>

                                <div className="mb-3 row">
                                    <input type="text" className="form-control input-type-custom col mx-1" name='Role' placeholder='Role' readOnly />
                                </div>

                                <div className="form-check col checkbox-div mb-3">
                                    <input type="checkbox" className="form-check-input border border-dark border-2 input-type-custom" name="checkbox1" id="exampleCheck1" />
                                    <label className="form-check-label">I aggree to terms and conditions</label><a href="#">Terms and conditions</a>
                                </div>

                                <div>
                                    <p className="mb-3 fw-normal">Are you a Donor?<a href=""><span>Register as Donor</span></a></p>
                                </div>

                                <div className="row mb-3">
                                    <button type="submit" className="btn btn-success col mx-1">Update</button>
                                    <button type="reset" className="btn btn-danger col">Reset</button>
                                </div>

                            </form>

                        </div>

                        <div className="modal-footer">
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

            {/*Confirmation model*/}
            <div className="modal" id='confrimation'>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confrimation of recieving donations!!</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Did you get the donations successfully , please consider that after you confrimed this we will close the donation process for you current donation</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => createDonationHistory()}>Confrim</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>

        </>
    )
}

export default RecipientProfile
