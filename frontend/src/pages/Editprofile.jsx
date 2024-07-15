import React, { useEffect, useState } from 'react'
import "./editprofile.css"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Editprofile() {
    const [data,setData]=useState({})
    const loc=useLocation()
    const navigate=useNavigate()
    useEffect(()=>{
        setData(loc.state.user)
    },[])

    function handlechange(e){
        const {name,value}=e.target;
        setData({
            ...data,
            [name]:value,
        })
    }

    function submitData(){
        console.log(data)
        axios.post("http://localhost:7000/edituser",data,{withCredentials:true}).then((res)=>{
            if(res.data.flag){
                alert("sucessfully updated");
                navigate('/')

            }
        })
    }
   
  return (
    <div className='editprofile-main'>
    <div className="editprofile-section">
        <div className="editprofile-header">
            <h1>Edit Profile</h1>
        </div>
        <div className='edit-content'>
        <div className='edit-inp'>
        <label>Name</label>
        <input type="text" name='name' value={data.name} onChange={handlechange} /><br />
        </div>
       
        <div className='edit-inp'>
        <label>Age</label>
        <input className='age' name='age' type="number" value={data.age} onChange={handlechange}/><br />
        </div>
        
        </div>
        <button className='save-btn' onClick={submitData}>Save</button>
        
      

    </div>
      
    </div>
  )
}

export default Editprofile
