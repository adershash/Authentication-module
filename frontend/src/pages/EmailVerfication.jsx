import React, { useState } from 'react'
import "./emailverification.css"
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function EmailVerfication() {
    const [otp,setOtp]=useState('')
    const loc=useLocation()
  return (
    <div className='email-main'>
      <div className="email-form">
        <div className="email-head">
        <h1>Email Verification</h1>
        </div>
        <p>*Verify your email to continue</p>
        <div className="emailotp-inp">
        <label htmlFor="">Enter OTP</label>
        <input type="password" name="otp" placeholder='OTP' value={otp} onChange={(e)=>{
            setOtp(e.target.value)
        }} /><br/>
        </div>
     
    <button className='login-btn' onClick={()=>{
        const values={email:loc.state.email,otp:otp}
        axios.post('http://localhost:7000/verifyemail',values,{withCredentials:true})
    }} >Verify</button>
    
      </div>
      
     
    </div>
  )
}

export default EmailVerfication
