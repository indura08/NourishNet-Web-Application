import React, { useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import "./RecipientSignUp.css"
import loginimg from "../assets/login2.jpeg"
import { District } from '../../Models/Enums/DistrictValue'
import { Province } from '../../Models/Enums/ProvinceValue'
import { RecipientType } from '../../Models/Enums/RecipientType'
import { Role } from '../../Models/Enums/Role'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RecipientSignUp:React.FC = () => {

    const navigate = useNavigate()
    const [ isValid , setIsValid] = useState(false);
    const [ newRecipient, setNewRecipient ] = useState({
        id : "",
        recipientName: "",
        contactPerson: "",
        phone: "",
        baseDistrict: District.COLOMBO,
        baseProvince: Province.WESTERN,
        address: "" ,
        recipientType: RecipientType.Volunteer,
        role: Role.Recipient,
        email: "", 
        password: "" , 
        confirmPassword: "" ,  
        userName: "" ,
        userType: ""
    })

    const recipientType = Object.values(RecipientType)
    const district = Object.values(District)
    const province = Object.values(Province)

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRecipient({
            ...newRecipient,
            baseDistrict:e.target.value as District
        })
    }

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRecipient({
            ...newRecipient,
            baseProvince:e.target.value as Province
        })
    }

    const handleRecipientType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRecipient({
            ...newRecipient,
            recipientType:e.target.value as RecipientType
        })
    }

    const areAllformFeildsfilled = () => {
        return Object.values(newRecipient).every((field) => field.trim() !== '');
    }

    const handleIsValid = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(areAllformFeildsfilled() && e.target.checked){
            setIsValid(false);
        }else {
            setIsValid(true)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name , value } = e.target
            setNewRecipient(
                {
                    ...newRecipient,
                    [name]:value
                }
            )
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        try {
            const res = axios.post("http://localhost:5223/api/Recipient/create" , newRecipient)

            if((await res).status == 200 || (await res).status == 201){
                console.log("user created successfully")
                navigate("/recipient/login")
            }
        }catch(error){
            throw error;
            console.log(error);
        }
    }

  return (
    <>
        <Header></Header>
        
        <div className='d-flex flex-column flex-md-row align-items-center justify-content-center container-fluid mb-3'>
            <div className='d-flex divMargin align-items-center justify-content-center d-none d-md-block'>
                <img src={loginimg} className="imgstyle"/>
            </div>

            <div className='border w-100 w-md-50 py-2 mx-3 justify-content-center divMargin border border-dark border-3 main-div-margin mx-4'>
                <center><h3>Register Your Recipient Account</h3></center>

                <form className='mx-4 mt-4' onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='recipientName' placeholder='RecipientName' onChange={handleChange}/>
                        
                        <select className="form-control input-type-custom col mx-1" name='recipientType' onChange={handleRecipientType}>
                            {recipientType.map((recipient) => (
                                    <option key={recipient} value={recipient}>{recipient}</option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='contactPerson' placeholder='ContactPerson' onChange={handleChange}/>
                        <input type="text" className="form-control input-type-custom col mx-1" name='phone' placeholder='Phone' onChange={handleChange}/>
                    </div>

                    <div className="mb-3 row">
                        <select className="form-control input-type-custom col mx-1" name='baseDistrict' onChange={handleDistrictChange}>
                            {district.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                        </select>
                        
                        <select className="form-control input-type-custom col mx-1" name='baseProvince' onChange={handleProvinceChange}>
                            {province.map((province) => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='address' placeholder='Address' onChange={handleChange}/>
                        <input type="text" className="form-control input-type-custom col mx-1 " name='userType' placeholder='UserType' onChange={handleChange}/>
                    </div>

                    <div className="mb-3 row">
                        <input type="email" className="form-control input-type-custom col mx-1" name='email' placeholder='Email' onChange={handleChange}/>
                        <input type="text" className="form-control input-type-custom col mx-1" name='userName' placeholder='UserName' onChange={handleChange}/>
                    </div>

                    <div className="mb-3 row">
                        <input type="password" className="form-control input-type-custom col mx-1" name='password' placeholder='Password' onChange={handleChange}/>
                        <input type="password" className="form-control input-type-custom col mx-1" name='confirmPassword' placeholder='ConfirmPassword' onChange={handleChange}/>
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='role' placeholder='Role' onChange={handleChange}/>
                    </div>
                    
                    <div className="form-check col checkbox-div mb-3">
                        <input type="checkbox" className="form-check-input border border-dark border-2 input-type-custom" name="checkbox1" id="exampleCheck1" onChange={handleIsValid}/>
                        <label className="form-check-label">I aggree to terms and conditions</label><a href="#">Terms and conditions</a> 
                    </div>

                    <div>
                        <p className="mb-3 fw-normal">Are you a Donor?<a href=""><span>Register as Donor</span></a></p> 
                    </div>

                    <div className="row mb-3">
                        <button type="submit" className="btn btn-success col mx-1" disabled={!isValid}>Register</button>
                        <button type="reset" className="btn btn-danger col">Reset Form</button>
                    </div>
                </form>
            </div>
        </div>

        <Footer></Footer>
    </>
  )
}

export default RecipientSignUp
