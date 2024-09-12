import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import "./FoodListsPage.css"
import card2 from "../assets/card2.png"
import { FoodListing } from "../../Models/FoodListing"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/MainStore'

const FoodListsPage: React.FC = () => {

    const [foodlistings , setFoodListings] = useState<FoodListing[]>([]);
    // const [loading , setLoading] = useState<boolean>(true);
    // const [error , setError ] = useState<string>("");

    const { rtoken } = useSelector((state: RootState) => state.recipient) //45e51e62-f0cf-4c6f-aa97-53cfcd6a99e1  //
    const { currentDonor } = useSelector((state: RootState) => state.donor);
    const { dtoken } = useSelector((state:RootState) => state.donor)
    
    console.log(currentDonor)
    //console.log(token) 

    useEffect(() => {
        const fetchFoodListings = async () => {
            try {
                const res = await axios.get("http://localhost:5223/api/FoodListing/all", {
                    headers: {
                        Authorization: dtoken ? `Bearer ${dtoken}` : `Bearer ${rtoken}` 
                    }
                })
                setFoodListings(res.data)
                console.log(foodlistings)
                console.log(res.data)
                //setLoading(false);
            }catch(error){
                //setError("failde to fetch food loading " + error)
                //setLoading(false);

                console.log("error occured : " + error) //this is for debuggin purposes
            }
        }
        fetchFoodListings()
    }, [])

  return (
    <>
        <Header></Header>
        <div className='container-fluid desc-div'>
            <div className='w-50 mx-3'>
                <h1 className='h1-font mt-4'>Find <span className='text-warning'>Kind</span> Donations:</h1><br/>
                <h6>Welcome to our Food Donation Listings! Here you'll find a variety of food items generously 
                    contributed by donors, ready to be shared with those in need. 
                    Each listing represents an opportunity to help reduce food waste and support communities. 
                    Browse through the available donations and make a positive impact today by choosing the 
                    items that can make a difference in someone's life. To hae more seamless services we Provide:</h6>
                <button className='btn btn-dark mx-1 mt-3'>Sign Up As Donor</button>
                <button className='btn btn-dark mx-1 mt-3'>SignUp As Recipient</button>
            </div> 
        </div>

        <div className='container-fluid mt-4 mb-3'>
            <center><h1 className='text-dark'>Donations</h1></center>
            <div className="d-flex justify-content-between py-2 container-fluid">
                <div className="mx-5">
                    sort jobs by:
                </div>

                <div className="mx-5 d-flex">
                    <span className="py-1 custom-margin fw-bold">Province:</span>
                    <select className="form-select" aria-label="Default select example">
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

                <div className="mx-5 d-flex">
                    <span className="py-1 custom-margin fw-bold">District:</span>
                    <select className="form-select" aria-label="Default select example">
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
                        <div key={listing.id} className="card mt-3 mb-3 mx-4" style={{width: "20rem"}}>
                            <img src={card2} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <center><h5 className="card-title">{listing.foodType}</h5></center>
                                <p className="card-text">{listing.description}</p>
                                <p>Expiry Date: {listing.expiryDate}</p>
                                <p>Phone:{listing.postedDate}</p>
                                <p>Current status: {listing.currentStatus}</p>
                                <p>Donor : {listing.donor.userName}</p>
                                <p>Donor contact : {listing.donor.phone}</p>
                                <div className='d-flex justify-content-center'>
                                    <a href="#" className="btn btn-success btn-custom mx-1" >{currentDonor.id === listing.donor.id ? "Edit" : "Report"}</a>
                                    <a href="#" className="btn btn-danger btn-custom mx-1 ">{currentDonor.id === listing.donor.id ? "Delete" : "Apply"}</a>
                                </div>
                            </div>
                        </div>
                    )) }           
                </div>
            </div>
        </div>

        <div className="modal" id='edit'>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    </>
  )

  
}



export default FoodListsPage
