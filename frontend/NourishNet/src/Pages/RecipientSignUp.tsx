import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import "./RecipientSignUp.css"
import loginimg from "../assets/login2.jpeg"

const RecipientSignUp:React.FC = () => {
  return (
    <>
        <Header></Header>
        
        <div className='d-flex container-fluid mb-3'>
            <div className='d-flex divMargin align-items-center justify-content-center'>
                <img src={loginimg} className="imgstyle"/>
            </div>

            <div className='border w-50 py-2 mx-3 justify-content-center divMargin border border-dark border-3 main-div-margin'>
                <center><h3>Register Your Recipient Account</h3></center>

                <form className='mx-4 mt-4'>
                    <div className="mb-3 row">
                        <input type="text" className="form-control input-type-custom col mx-1" name='RecipientName' placeholder='RecipientName'/>
                        <input type="text" className="form-control input-type-custom col mx-1" name='RecipientType' placeholder='RecipientType'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="email" className="form-control input-type-custom col mx-1" name='ContactPerson' placeholder='ContactPerson' />
                        <input type="password" className="form-control input-type-custom col mx-1" name='Phone' placeholder='Phone'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="email" className="form-control input-type-custom col mx-1" name='BaseDistrict' placeholder='BaseDistrict'/>
                        <input type="password" className="form-control input-type-custom col mx-1" name='BaseProvince' placeholder='BaseProvince'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="email" className="form-control input-type-custom col mx-1" name='Address' placeholder='Address'/>
                        <input type="password" className="form-control input-type-custom col mx-1 " name='UserType' placeholder='UserType'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="email" className="form-control input-type-custom col mx-1" name='Email' placeholder='Email'/>
                        <input type="email" className="form-control input-type-custom col mx-1" name='UserName' placeholder='UserName'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="email" className="form-control input-type-custom col mx-1" name='Password' placeholder='Password'/>
                        <input type="password" className="form-control input-type-custom col mx-1" name='ConfirmPassword' placeholder='ConfirmPassword'/>
                    </div>

                    <div className="mb-3 row">
                        <input type="password" className="form-control input-type-custom col mx-1" name='Role' placeholder='Role'/>
                    </div>
                    
                    <div className="form-check col checkbox-div mb-3">
                        <input type="checkbox" className="form-check-input border border-dark border-2 input-type-custom" name="checkbox1" id="exampleCheck1"/>
                        <label className="form-check-label">I aggree to terms and conditions</label><a href="#">Terms and conditions</a> 
                    </div>

                    <div>
                        <p className="mb-3 fw-normal">Are you a Donor?<a href=""><span>Register as Donor</span></a></p> 
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

export default RecipientSignUp
