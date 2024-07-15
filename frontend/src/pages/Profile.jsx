import React,{useEffect, useState} from 'react'
import "./profile.css"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Profile() {
    const location=useLocation();
    const [userData,setuserdata]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
       
        axios.get('http://localhost:7000/',{withCredentials:true}).then((res)=>{
          console.log(res.data)
          if(res.data.valid){
            setuserdata(res.data.user)
          }
          else{
            navigate('/login')
          }
        })
    })

  return (
    <div className='profile-main'>
        <div className="profile-section">
            <div className="profile-header">
            <h1 className='profile-header'>Profile</h1>
            </div>
           
            <div className="icons">
            <svg data-slot="icon" fill="rgb(1, 1, 49)" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='icon'>
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
</svg>

            </div>
            <div className='profile-content'>
            <h1>{userData.name}</h1>
            <p>{userData.email}</p>
           {userData.age&& <p>Age:{userData.age}</p>}

            </div>

            <div className="profile-btns">
                <button className='pbtns' onClick={()=>{
                    navigate('/edit',{state:{user:userData}})
                }}>Edit</button>
                <button className='pbtns changepswd' onClick={()=>{
                    navigate('/changepswd')
                }}>change password</button>
                <button className='pbtns'>delete</button>
            </div>

            
   


        </div>
      
    </div>
  )
}

export default Profile
