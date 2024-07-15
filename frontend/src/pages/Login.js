import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./login.css"

function Login() {
   
   
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [valerror,setValError]=useState({})
    //axios.defaults.withCredentials=true;
    function setLogin(){

            let values={email:email,password:password}
            const validationError={}
            if(!email.trim())
              {
                validationError.email="email is required"
              }
              else if(!/\S+@\S+\.\S+/.test(email)){
                validationError.email="invalid email is entered"
              }
              if(!password.trim()){
                validationError.password="password is required"
              }
              setValError(validationError)
              if(Object.keys(validationError).length===0 && validationError.constructor===Object){
                axios.post('http://localhost:7000/login',values,{withCredentials:true}).then((data)=>{
                  console.log(data.data.flag)
                  if(data.data.flag){
                    if(data.data.verifiedflag){
                      navigate('/verifylogin')
                    }
                  else{
                    navigate('/emailverify',{state:{email:data.data.email}})
                  }
                      
                  }else{alert('username or password miss match')}})
              }
            
          
    }

  return (
    <div className='login-main'>
      <div className="login-form">
        <h1>Login</h1>
      <input type="email" name="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
      <div className='err-msg'>{valerror.email&&<span>{valerror.email}</span>}</div>
    <input type="password" name="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
   <div className='err-msg'>{valerror.password&&<span>{valerror.password}</span>}</div> 
    <button className='login-btn' onClick={setLogin}>Login</button>
    <p>Don't have an account? <Link to={"/signup"}>Signup</Link></p>
      </div>
      
     
    </div>
  )
}

export default Login
