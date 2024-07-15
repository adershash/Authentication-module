import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function VerifyLogin() {
    const [otp,setOtp]=useState('')
    const loc=useLocation()
    const navigate=useNavigate()
  return (
    <div className='email-main'>
      <div className="email-form">
        <div className="email-head">
        <h1>Login Verification</h1>
        </div>
        <p>* Enter otp to login</p>
        <div className="emailotp-inp">
        <label htmlFor="">Enter OTP</label>
        <input type="password" name="otp" placeholder='OTP' value={otp} onChange={(e)=>{
            setOtp(e.target.value)
        }} /><br/>
        </div>
     
    <button className='login-btn' onClick={()=>{
        const values={otp:otp}
        axios.post('http://localhost:7000/verifylogin',values,{withCredentials:true}).then((res)=>{
          if(res.data){
            alert("otp verified successfully")
            navigate('/')
          }
          else{
            alert("invalid otp entered")
          }
        })
    }} >Verify</button>
    
      </div>
      
     
    </div>
  )
}

export default VerifyLogin
