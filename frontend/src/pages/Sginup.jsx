import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import axios from 'axios'

function Sginup() {
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [age,setAge]=useState()
    const [cmfpassword,setConfirm]=useState('')
    const [valerror,setValError]=useState({})
    function submitData(){
      
      const validationError={}
      let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
      if(!name.trim())
      {
        validationError.username="username is required"
      }
      if(!email.trim())
        {
          validationError.email="email is required"
        }
        else if(!/\S+@\S+\.\S+/.test(email)){
          validationError.email="invalid email is entered"
        }
        if(!age){
          validationError.age="age is required"
        }

        if(!password.trim()){
          validationError.password="password is required"
        }
       else if(password.length<8){
          validationError.password="password must have 8 characters"
        }
        else if(!regex.test(password)){
          validationError.password="password contain one capital letter one small letter and a digit"
        }
        if(!cmfpassword.trim()){
          validationError.cmfpassword="confirm password required"
        }
        else if(password!==cmfpassword){
          validationError.cmfpassword="password must be same"
        }
       
        setValError(validationError)
        if(Object.keys(validationError).length===0 && validationError.constructor===Object){
         const values={name:name,
          email:email,
          age:age,
          password:password
         }
          
          
          axios.post('http://localhost:7000/signup',values,{withCredentials:true}).then((res)=>{
            console.log('flag',res.data.flag);
            if(!res.data){
              alert('user already exist')
            }
            else{
              navigate('/emailverify',{state:{email:email}})
            }
          })
          
        }
        else{
          console.log('error')
          
            
        }
       
      
        
    }
   
  return (
    <div className='signup-main'>
      <div className="signup-form">
        <h1>Sign Up</h1>
        
        <input type="text" className='inp1' placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
       <div className="signuperr-msg"> {valerror.username&&<span>{valerror.username}</span>}</div>
        <input type="email" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <div className="signuperr-msg"> {valerror.email&&<span>{valerror.email}</span>}</div>
        <input type="number" placeholder='age' value={age} onChange={(e)=>setAge(e.target.value)}/>
        <div className="signuperr-msg"> {valerror.age&&<span>{valerror.age}</span>}</div>
        <input type="password" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <div className="signuperr-msg"> {valerror.password&&<span>{valerror.password}</span>}</div>
        <input type="password" placeholder='confirm password' value={cmfpassword} onChange={(e)=>{setConfirm(e.target.value)}}/>
        <div className="signuperr-msg"> {valerror.cmfpassword&&<span>{valerror.cmfpassword}</span>}</div>
        <button id='signup-btn' className='signup-btn' onClick={submitData} >Sign Up</button>
        <p>already have an account? <Link to={"/login"}>Login</Link></p>
      </div>
      
    </div>
  )
}

export default Sginup
