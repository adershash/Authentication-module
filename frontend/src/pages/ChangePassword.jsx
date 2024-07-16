import React, { useState } from 'react'
import "./changepassword.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ChangePassword() {
    const navigate=useNavigate()
    const [password,setPassword]=useState({
        current:"",
        new:"",
        conform:""
    })
    const [error,setValError]=useState({})
    function handlechange(e){
        const {name,value}=e.target;
        setPassword({
            ...password,
            [name]:value,
        })
    }

    function handlesubmit(){
        
        const validationError={}
        let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if(!password.current.trim()){
            validationError.current="current password is required"
        }
        if(!password.new.trim()){
            validationError.new="new password is required"
          }
         else if(password.new.length<8){
            validationError.new="password must have 8 characters"
          }
          else if(!regex.test(password.new)){
            validationError.new="password contain one capital letter one small letter and a digit"
          }
          if(!password.conform.trim()){
            validationError.conform="confirm password required"
          }
          else if(password.new!==password.conform){
            validationError.conform="password must be same"
          }
         console.log(validationError)
          setValError(validationError)
          if(Object.keys(validationError).length===0 && validationError.constructor===Object){
            axios.post('http://localhost:7000/editpassword',password,{withCredentials:true}).then((res)=>{
                
                if(res.data.flag){
                  Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "Password updated successfully",
                    showConfirmButton: false,
                    timer: 1600
                  });
                   navigate('/') 
                }else{
                    alert("current password is mismatch")
                }
            })

          }

    }
  return (
    <div className='password-main'>
    <div className="password-section">
        <div className="password-header">
            <h1>Change password</h1>
        </div>
        
        <div className="password-content">
                {error.current?<span>{error.current}</span>:<label>Current password</label>}
                <input className='pswd' name='current' type="password"  value={password.current} onChange={handlechange}/><br />
                {error.new?<span>{error.new}</span>:<label>New password</label>}
                <input className='pswd' name='new' type="password" value={password.new} onChange={handlechange} /><br />
        
                {error.conform?<span>{error.conform}</span>:<label>Confirm password</label>}
                 <input className='pswd' name='conform' type="password" value={password.conform} onChange={handlechange} /><br />
                
        </div>
       <div className="pswd-btn">
       <button className='change-btn' onClick={handlesubmit}>Change password</button>
       </div>
       
        
      

    </div>
      
    </div>
  )
}

export default ChangePassword
