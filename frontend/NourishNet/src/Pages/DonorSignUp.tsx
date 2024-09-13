import React, { useState } from 'react'
import Header from '../Components/Header'
import loginimg from "../assets/login.png"
import "./RecipientSignUp.css"
import Footer from '../Components/Footer'
import { Donor } from '../../Models/Donor'
import { District } from '../../Models/Enums/DistrictValue'
import { Province } from '../../Models/Enums/ProvinceValue'
import { Role } from '../../Models/Enums/Role'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DonorSignUp:React.FC = () => {
    const [donorData, setDonorData] = useState<Donor>({
        id: '',
        organizaTionName: '',
        organizationType: '',
        contactPerson: '',
        phone: '',
        baseDistrict: District.COLOMBO , 
        baseProvince: Province.WESTERN, 
        address: '',
        operatingHours: '',
        email: '',
        password: '',
        confirmPassword: '',
        userName: '',
        role: Role.Donor, 
        userType: ''
    })

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name , value } = e.target
        setDonorData({
            ...donorData,
            [name]: value
        })
        // console.log(donorData.OrganizationName); this was fro debugging purposes
    }

    const handleSubmit  = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = axios.post("http://localhost:5223/api/Donor/create" , donorData)
            if((await response).status === 200 || (await response).status === 201){
                navigate('donor/profile')
                console.log("test complete user has been created successfully") //this line is for debugginf purposes 
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
        <Header></Header>
        
        <div className='d-flex container-fluid mb-3'>
            <div className='d-flex divMargin align-items-center justify-content-center'>
                <img src={loginimg} className="imgstyle"/>
            </div>

            <div className='border w-50 py-2 justify-content-center divMargin border border-dark border-3 main-div-margin'>
                <center><h3>Register Your Donor Account</h3></center>

                <form className='mx-4 mt-5' onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='OrganizationName' onChange={handleChange} value={donorData.organizaTionName} placeholder='OrganizaTion Name'/>
                        <input type="text" className="form-control input-type-custom col mx-1" name='OrganizationType' onChange={handleChange} value={donorData.organizationType}  placeholder='OrganizationType'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='ContactPerson' onChange={handleChange} value={donorData.contactPerson} placeholder='ContactPerson' />
                        <input type="text" className="form-control input-type-custom col mx-1" name='Phone' onChange={handleChange} value={donorData.phone} placeholder='Phone'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='BaseDistrict' onChange={handleChange} value={donorData.baseDistrict} placeholder='BaseDistrict'/>
                        <input type="text" className="form-control input-type-custom col mx-1" name='BaseProvince' onChange={handleChange} value={donorData.baseProvince} placeholder='BaseProvince'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='Address' onChange={handleChange} value={donorData.address} placeholder='Address'/>
                        <input type="text" className="form-control input-type-custom col mx-1 " name='UserType' onChange={handleChange} value={donorData.userType} placeholder='UserType'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="email" className="form-control input-type-custom col mx-1" name='Email' onChange={handleChange} value={donorData.email} placeholder='Email'/>
                        <input type="text" className="form-control input-type-custom col mx-1" name='OperatingHours' onChange={handleChange} value={donorData.operatingHours} placeholder='Operating hours'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="password" className="form-control input-type-custom col mx-1" name='Password' onChange={handleChange} value={donorData.password} placeholder='Password'/>
                        <input type="password" className="form-control input-type-custom col mx-1" name='ConfirmPassword' onChange={handleChange} value={donorData.confirmPassword} placeholder='ConfirmPassword'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='UserName' onChange={handleChange} value={donorData.userName} placeholder='UserName'/>
                        <input type="text" className="form-control input-type-custom col mx-1" name='Role' onChange={handleChange} value={donorData.role} placeholder='Role'/>
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
                </form>
            </div>
        </div>

        <Footer></Footer>

        
    </>
  )
}

export default DonorSignUp
