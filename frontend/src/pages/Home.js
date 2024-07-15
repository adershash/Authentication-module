import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./home.css"

function Home() {
 
    const navigate=useNavigate()
    const [userData,setuserdata]=useState({})

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
    <div className='home-main'>
      <div className="home-section">
        {<h1>Welcome {userData.name}</h1>}

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
<h2>{userData.name}</h2>
<div className="home-btn-section">
<button className='profile-btn' onClick={()=>{
  navigate('/profile',{state:{userdata:userData}})
}}>View Profile</button>
<button className='profile-btn' onClick={()=>{
  axios.get('http://localhost:7000/logout',{withCredentials:true}).then((res)=>{
    if(res.data.flag){
      navigate('/login')
    }
  })
}}>Logout</button>

</div>


      </div>
       
    </div>
  )
}

export default Home
