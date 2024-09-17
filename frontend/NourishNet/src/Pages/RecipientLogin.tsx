import React, { useState } from 'react'
import "./RecipientLogin.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../Redux/MainStore'
import { login } from '../Redux/RecipientApiCalls'

const RecipientLogin:React.FC = () => {

    const[email , setEmail] = useState("")
    const[ password, setPassword ] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isFetching, error } = useSelector((state:RootState) => state.recipient)

    const handleLogin = (e:any):void => {
        e.preventDefault();
        login(dispatch, { email, password} , navigate)
    }
  return (
    <>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    </head>
    <div className='container-fluid background-custom d-flex justify-conttent-center'>
        <div className='container-fluid mt-5 d-flex flex-column align-items-center justify-content-center w-75'>
            <center><h1>Hello again Recipient👋</h1></center>
            <form className='mt-4 w-75'>   
                <div className='d-flex align-items-center'>
                    <span className="material-symbols-outlined fs-1 mb-4 mx-2 d-none d-md-block">person</span>
                    <div className="form-floating mb-3 d-flex w-100">
                        <input type="email" className="form-control input-custom" id="floatingInput" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com"/>
                        <label>Email address</label>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <span className="material-symbols-outlined fs-1 mb-4 mx-2 d-none d-md-block">lock</span>
                    <div className="form-floating mb-3 d-flex w-100">
                        <input type="password" className="form-control input-custom w-100" id="floatingInput" onChange={(e) => setPassword(e.target.value)} placeholder="name@example.com"/>
                        <label>Password</label>
                    </div>
                </div>  
            </form>

            <div className='w-75 d-flex justify-content-center flex-column'>
                <button className='btn btn-dark w-100' style={{height:"50px"}} onClick={handleLogin} disabled={isFetching}>Login</button>
                {error && <p className='text-danger'>Something went wrong</p>}
            </div>
            <p className="text-dark text-success text-center pharagraph">Forgot password? <a href="" className="text-link">Click here</a></p>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <p className="text-success fs-7"><a href="/donor/login"><h4>Login as Donor</h4></a></p>
                <p className="text-dark fs-7">new to NourishNet?</p>
                <div className="d-flex flex-column flex-md-row">
                    <button type="submit" className="btn btn-primary mb-3 py-2 flex-grow-1 mx-1 regitser-button" style={{borderRadius:"10px"}}><a href="/donor/register" className='btn-custom'>Sign up as Donor</a></button>
                    <button type="submit" className="btn btn-primary mb-3 py-2 flex-grow-1 mx-1 regitser-button" style={{borderRadius:"10px"}}><a href="/recipient/register" className='btn-custom'>Sign up as Recipient</a></button>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default RecipientLogin
