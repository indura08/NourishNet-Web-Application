import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import "./FoodListsPage.css"
import card2 from "../assets/card2.png"
import { FoodListing } from "../../Models/FoodListing"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/MainStore'
import { District } from '../../Models/Enums/DistrictValue'
import { Province } from '../../Models/Enums/ProvinceValue'
import { Role } from '../../Models/Enums/Role'
import { FoodType } from '../../Models/Enums/FoodType'
import { FoodListingStatus } from '../../Models/Enums/FoodListingStatus'
import { NotificationDonor } from '../../Models/NotificationDonor'
import { NotificationRecipient } from '../../Models/NotificationRecipient'
//import { FoodListingStatus } from '../../Models/Enums/FoodListingStatus'

const FoodListsPage: React.FC = () => {

    let [foodlistings , setFoodListings] = useState<FoodListing[]>([]);
    let [filterdfoodlisitng , setFilteredFoodListings] = useState<FoodListing[]>([]);
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

    const { rtoken, currentRecipient } = useSelector((state: RootState) => state.recipient)
    const { currentDonor } = useSelector((state: RootState) => state.donor);
    const { dtoken } = useSelector((state:RootState) => state.donor)

    const today = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const donationApplyNotification : NotificationDonor = {
        id: 0,
        donorId: currentfoodListing.donorId,
        donor: currentfoodListing.donor,
        description: `Your donation "${currentfoodListing.description}" has been applied by "${currentRecipient.userName}".
                        please contact them now: ${currentRecipient.phone}`,
        createdDate: today.toString(),
        createtime: time.toString()
    }

    const newRecipientNotification : NotificationRecipient = {
        id: 0,
        recipientId: currentRecipient.id,
        recipient: currentRecipient,
        description: `You have applied to "${currentfoodListing.description}" Donation. 
                        Now you can contact the donor. tele: ${currentfoodListing.donor.phone}`,
        createdDate: today.toString(),
        createdTime: time.toString()
    }

    //console.log(token) 

    const fetchFoodListings = async (): Promise<FoodListing[]> => {
        try {
            const res = await axios.get("http://localhost:5223/api/FoodListing/all", {
                headers: {
                    Authorization: dtoken ? `Bearer ${dtoken}` : `Bearer ${rtoken}` 
                }
            })
            setFoodListings(res.data)
            return res.data
        }catch(error){
            console.log("error occured : " + error)
            throw error;        //mehma damme catch blok ekn aniwaryen deyk retunr wenna one hinda , dan promise eka reject wenne catch ekn hinda apita return eka widiyt throw ekk denna puluwan 
        }
    }

    const notificationCreation = () => {
        try {
            const responseNotification = axios.post("http://localhost:5223/api/NotificationDonor/create" , donationApplyNotification);
            console.log(responseNotification);
        }catch (error){
            console.log(`Error occured and the error is : ${error}`);
        }
    }

    const recipientNotificationCreation = () => {
        try {
            const responseNotification = axios.post("http://localhost:5223/api/NotificationRecipient/create" , newRecipientNotification);
            console.log(responseNotification);
        }catch (error){
            console.log(`Error occured and the error is : ${error}`);
        }
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

    const handledelete = (): void => {
        try {
            const res = axios.delete(`http://localhost:5223/api/FoodListing/delete/${currentfoodListing.id}` , {
                headers: {
                    Authorization: `Bearer ${dtoken}`
                }
            })
            console.log(currentfoodListing)
            console.log(res)
        }catch(error){
            alert(`error occured ${error}`)
        }
    } 

    const applyFunction = (): void => {
        currentfoodListing.currentStatus = FoodListingStatus.Claimed;
        try {
            const res = axios.put(`http://localhost:5223/api/FoodListing/update/${currentfoodListing.id}` , currentfoodListing, {
                headers: {
                    Authorization: dtoken ? `Bearer ${dtoken}` : `Bearer ${rtoken}`
                }
            })
            notificationCreation();
            recipientNotificationCreation();
            console.log(res);
            console.log(currentfoodListing);
        }catch(error){
            console.log("error occured" + error)
        }
    }


    const filterDistrct = async (value:any) : Promise<void> =>  {
 
        if(value == 1){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.AMPARA)
            setFoodListings(foodlistings);
        }
          else if(value == 2){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.ANURADHAPURA)
            setFoodListings(foodlistings);
        }
          else if(value == 3){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.BADULAA)
            setFoodListings(foodlistings);
        }
          else if(value == 4){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.BATTICALOA)
            setFoodListings(foodlistings);
        }
          else if(value == 5){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.COLOMBO)
            setFoodListings(foodlistings);
        }
          else if(value == 6){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.GALLE)
            setFoodListings(foodlistings);
        }
          else if(value == 7){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.GAMPAHA)
            setFoodListings(foodlistings);
        }
          else if(value == 8){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.HAMBANTHOTA)
            setFoodListings(foodlistings);
        }
          else if(value==9){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.JAFFNA)
            setFoodListings(foodlistings);
        }
          else if(value==10){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.KALUTHARA)
            setFoodListings(foodlistings);
        }
          else if(value==11){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.KANDY)
            setFoodListings(foodlistings);
        }
          else if(value==12){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.KEGALLE)
            setFoodListings(foodlistings);
        }
          else if(value==13){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.KILINOCHCHI)
            setFoodListings(foodlistings);
        }
          else if(value==14){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.KURUNEGALA)
            setFoodListings(foodlistings);
        }
          else if(value==15){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.MANNER)
            setFoodListings(foodlistings);
        }
          else if(value==16){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.MATALE)
            setFoodListings(foodlistings);
        }
          else if(value==17){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.MATARA)
            setFoodListings(foodlistings);
        }
          else if(value==18){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.MONARAGALA)
            setFoodListings(foodlistings);
        }
          else if(value==19){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.MULLAITIVU)
            setFoodListings(foodlistings);
        }
          else if(value==20){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.NUWARA_ELIYA)
            setFoodListings(foodlistings);
        }
          else if(value==21){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.POLLANNARUWA)
            setFoodListings(foodlistings);
        }
          else if(value==22){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.PUTTALAM)
            setFoodListings(foodlistings);
        }
          else if(value==23){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.RATHNAPURA)
            setFoodListings(foodlistings);
        }
          else if(value==24){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.TRINCOMALEE)
            setFoodListings(foodlistings);
        }
          else if(value==25){
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseDistrict == District.VAVUNIYA)
            setFoodListings(foodlistings);
        }
    }

    const filterProvince = async(value:any) : Promise<void> => {
        if(value == 1) {
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseProvince == Province.CENTRAL)
            setFoodListings(foodlistings);
        }
        else if (value == 2) {
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseProvince == Province.EASTERN)
            setFoodListings(foodlistings);
        }

        else if (value == 3) {
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseProvince == Province.NORTH_CENTRAL)
            setFoodListings(foodlistings);
        }
        else if (value == 4) {
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseProvince == Province.NORTHERN)
            setFoodListings(foodlistings);
        }
        else if (value == 5) {
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseProvince == Province.NORTH_WESTERN)
            setFoodListings(foodlistings);
        }
        else if (value == 6) {
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseProvince == Province.SABARAGAMUWA)
            setFoodListings(foodlistings);
        }
        else if (value == 7) {
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseProvince == Province.SOUTHERN)
            setFoodListings(foodlistings);
        }
        else if (value == 8) {
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseProvince == Province.UVA)
            setFoodListings(foodlistings);
        }
        else if (value == 9) {
            filterdfoodlisitng = await fetchFoodListings()
            foodlistings = filterdfoodlisitng.filter(listing => listing.donor.baseProvince == Province.WESTERN)
            setFoodListings(foodlistings);
        }

    }

    useEffect(() => {
        fetchFoodListings()
    }, [])

  return (
    <>
        <Header></Header>
        <div className='container-fluid desc-div'>
            <div className='w-50 mx-3 d-flex flex-column flex-md-column'>
                <h1 className='h1-font mt-4'>Find <span className='text-warning'>Kind</span> Donations:</h1><br/>
                <h6 className='d-none d-md-block'>Welcome to our Food Donation Listings! Here you'll find a variety of food items generously 
                    contributed by donors, ready to be shared with those in need. 
                    Each listing represents an opportunity to help reduce food waste and support communities. 
                    Browse through the available donations and make a positive impact today by choosing the 
                    items that can make a difference in someone's life. To hae more seamless services we Provide:</h6>
                <div>
                    <button className='btn btn-dark mx-1 mt-3'>Sign Up As Donor</button>
                    <button className='btn btn-dark mx-1 mt-3'>SignUp As Recipient</button>
                </div>
            </div> 
        </div>

        <div className='container-fluid mt-4 mb-3'>
            <center><h1 className='text-dark'>Donations</h1></center>
            <div className="d-flex flex-column flex-md-row justify-content-between py-2 container-fluid">
                <div className="mx-5 mb-3 mb-md-0">
                    <h5 className='fw-bolder'>sort jobs by:</h5>
                </div>

                <div className="mx-5 d-flex mb-3 mb-md-0">
                    <span className="py-1 custom-margin fw-bold">Province:</span>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => filterProvince(e.target.value)}>
                        <option selected>Select province</option>
                        <option value="1">CENTRAL</option>
                        <option value="2">EASTERN</option>
                        <option value="3">NORTH_CENTRAL</option>
                        <option value="4">NORTHERN</option>
                        <option value="5">NORTH_WESTERN</option>
                        <option value="6">SABARAGAMUWA</option>
                        <option value="7">SOUTHERN</option>
                        <option value="8">UVA</option>
                        <option value="9">WESTERN</option>
                    </select>
                </div>

                <div className="mx-5 d-flex mb-3 mb-md-0">
                    <span className="py-1 custom-margin fw-bold">District:</span>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => filterDistrct(e.target.value)}>
                        <option selected>Select province</option>
                        <option value="1">AMPARA</option>
                        <option value="2">ANURADHAPURA</option>
                        <option value="3">BADULAA</option>
                        <option value="4">BATTICALOA</option>
                        <option value="5">COLOMBO</option>
                        <option value="6">GALLE</option>
                        <option value="7">GAMPAHA</option>
                        <option value="8">HAMBANTHOTA</option>
                        <option value="9">JAFFNA</option>
                        <option value="10">KALUTHARA</option>
                        <option value="11">KANDY</option>
                        <option value="12">KEGALLE</option>
                        <option value="13">KILINOCHCHI</option>
                        <option value="14">KURUNEGALA</option>
                        <option value="15">MANNER</option>
                        <option value="16">MATALE</option>
                        <option value="17">MATARA</option>
                        <option value="18">MONARAGALA</option>
                        <option value="19">MULLAITIVU</option>
                        <option value="20">NUWARA_ELIYA</option>
                        <option value="21">POLLANNARUWA</option>
                        <option value="22">PUTTALAM</option>
                        <option value="23">RATHNAPURA</option>
                        <option value="24">TRINCOMALEE</option>
                        <option value="25">VAVUNIYA</option>
                    </select>
                </div>

                
            </div>
            <hr/>
            <div className='container-fluid'>
                <div className='d-flex row justify-content-center'>
                    { foodlistings.map((listing:FoodListing) => (
                        listing.currentStatus === FoodListingStatus.Available && (
                            <div key={listing.id} className="card mt-3 mb-3 mx-4" style={{width: "20rem"}}>
                            <img src={card2} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <center><h5 className="card-title">{listing.foodType}</h5></center>
                                <p className="card-text">{listing.description}</p>
                                <p>Expiry Date: {listing.expiryDate}</p>
                                <p>Quantity: {listing.quantity}</p>
                                <p>Current status: {listing.currentStatus}</p>
                                <p>Donor : {listing.donor.userName}</p>
                                <p>Donor contact : {listing.donor.phone}</p>
                                <div className='d-flex justify-content-center'>
                                    {currentDonor.id === listing.donor.id ? <button className='btn btn-success btn-custom mx-1' data-bs-toggle="modal" data-bs-target="#edit" onClick={() => setCurrentFoodListing(listing)}>Edit</button> : <button className='btn btn-warning btn-custom mx-1' data-bs-toggle="modal" data-bs-target="#report">Report</button>}
                                    {currentDonor.id === listing.donor.id ? <button className='btn btn-danger btn-custom mx-1' data-bs-toggle="modal" data-bs-target="#delete" onClick={() => setCurrentFoodListing(listing)}>Delete</button> : listing.currentStatus == FoodListingStatus.Available ? <button className='btn btn-primary btn-custom mx-1' data-bs-toggle="modal" data-bs-target="#apply" onClick={() => setCurrentFoodListing(listing)}>Apply</button> : <button className='btn btn-primary btn-custom mx-1' disabled data-bs-toggle="modal" data-bs-target="#apply">Apply</button>}
                                    
                                    {/* <button className="btn btn-success btn-custom mx-1" data-bs-toggle="modal" data-bs-target="#edit">{currentDonor.id === listing.donor.id ? "Edit" : "Report"}</button>
                                    <button className="btn btn-danger btn-custom mx-1 ">{currentDonor.id === listing.donor.id ? "Delete" : "Apply"}</button> */}
                                </div>
                            </div>
                        </div>
                        )
                    )) }           
                </div>
            </div>
        </div>
        
        {/* edit mddel */}
        <div className="modal" id='edit'>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Your Donation Information</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='mx-4' onSubmit={handleSubmit}>
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

            {/* report modal */}
            <div className="modal" id='report'>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>What do you want to report?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
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
                        <button type="button" className="btn btn-success" onClick={applyFunction}>Apply</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                        <button type="button" className="btn btn-danger" onClick={handledelete}>Delete</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
    </>
  )

  
}



export default FoodListsPage
