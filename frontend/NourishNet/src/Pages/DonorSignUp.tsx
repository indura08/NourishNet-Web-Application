import React, { useState } from 'react'
import Header from '../Components/Header'
import loginimg from "../assets/login.png"
import "./DonorSignUp.css"
import Footer from '../Components/Footer'
import { Donor } from '../../Models/Donor'
import { District } from '../../Models/Enums/DistrictValue'
import { Province } from '../../Models/Enums/ProvinceValue'
import { Role } from '../../Models/Enums/Role'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { OrganizationType } from "../../Models/Enums/OrganizationType"

const DonorSignUp:React.FC = () => {
    const [ isValid , setIsValid] = useState(false);
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

    const district = Object.values(District);
    const province = Object.values(Province);
    const orgType = Object.values(OrganizationType);

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDonorData({
            ...donorData,
            baseDistrict:e.target.value as District
        })
    }

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDonorData({
            ...donorData,
            baseProvince:e.target.value as Province
        })
    }

    const handleorgTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDonorData({
            ...donorData,
            organizationType:e.target.value as OrganizationType
        })
    }

    const areAllformFeildsfilled = () => {
        return Object.values(donorData).every((field) => field.trim() !== '');
    }

    const handleIsValid = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(areAllformFeildsfilled() && e.target.checked){
            setIsValid(false);
        }else {
            setIsValid(true)
        }
    }

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
                navigate('/donor/login')
                console.log("test complete user has been created successfully") //this line is for debugginf purposes 
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
        <Header></Header>
        
        <div className='d-flex flex-column flex-md-row align-items-center justify-content-center container-fluid mb-3'>
            <div className='d-flex divMargin align-items-center justify-content-center d-none d-md-block'>
                <img src={loginimg} className=""/>
            </div>

            <div className='border w-100 w-md-100 py-2 divMargin border border-dark border-3 main-div-margin mx-5'>
                <center><h3>Register Your Donor Account</h3></center>

                <form className='mx-4 mt-5' onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='OrganizationName' onChange={handleChange} placeholder='OrganizaTion Name'/>
                        <select className="form-control input-type-custom col mx-1" name='OrganizationType' onChange={handleorgTypeChange} defaultValue={donorData.organizationType}>
                            {orgType.map((orgType) => (
                                <option key={orgType} value={orgType}>{orgType}</option>
                            ))}
                        </select> 
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='ContactPerson' onChange={handleChange}  placeholder='ContactPerson' />
                        <input type="text" className="form-control input-type-custom col mx-1" name='Phone' onChange={handleChange} placeholder='Phone'/>
                    </div>

                    <div className="mb-3 row">
                        <select className="form-control input-type-custom col mx-1" name='BaseDistrict' onChange={handleDistrictChange}>
                            { district.map((district) => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                        
                        <select className="form-control input-type-custom col mx-1" name='BaseProvince' onChange={handleProvinceChange}>
                            {province.map((province) => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='Address' onChange={handleChange} placeholder='Address'/>
                        <input type="text" className="form-control input-type-custom col mx-1 " name='UserType' onChange={handleChange} placeholder='UserType'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="email" className="form-control input-type-custom col mx-1" name='Email' onChange={handleChange} placeholder='Email'/>
                        <input type="text" className="form-control input-type-custom col mx-1" name='OperatingHours' onChange={handleChange} placeholder='Operating hours'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="password" className="form-control input-type-custom col mx-1" name='Password' onChange={handleChange} placeholder='Password'/>
                        <input type="password" className="form-control input-type-custom col mx-1" name='ConfirmPassword' onChange={handleChange}  placeholder='ConfirmPassword'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='UserName' onChange={handleChange}  placeholder='UserName'/>
                        <input type="text" className="form-control input-type-custom col mx-1" name='Role' onChange={handleChange}  placeholder='Role'/>
                    </div>
                    
                    <div className="form-check col checkbox-div mb-3">
                        <input type="checkbox" className="form-check-input border border-dark border-2 input-type-custom" name="checkbox1" id="exampleCheck1" onChange={handleIsValid}/>
                        <label className="form-check-label">I aggree to terms and conditions</label><a href="#">Terms and conditions</a> 
                    </div>

                    <div>
                        <p className="mb-3 fw-normal">Are you a Recipient?<a href=""><span>Register as Recipient</span></a></p> 
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

export default DonorSignUp
