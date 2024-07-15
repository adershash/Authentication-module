const expres=require("express")
const route=expres.Router()
const database=require('./config/database')
const helper=require('./helper/userHelper')



route.get('/',(req,res)=>{
    
    if(req.session.userData){
    res.send({user:req.session.userData,valid:true})
    }
    else{
        res.send({valid:false})
    }
    
   })


route.post('/signup',async(req,res)=>{
    //console.log(req.body)
    let otp=''
   const flag=await helper.setData(req.body)
      if(flag){
        otp=await helper.generateOtp()
        const otpval={email:req.body.email,otp:otp}
      req.session.otpvalue= await otpval
       console.log('otp value is',req.session.otpvalue)
      res.json(flag)
      console.log('otp is',otp)
      console.log('email is',req.body.email)
      await helper.sendMail(req.body.email,otp)
       
      
    }
    else{
      res.json(flag)
    }
    
  
  })

route.post('/verifyemail',(req,res)=>{
  let op=req.session.otpvalue
  nedate=new Date()
  const {otp}=req.body
  console.log('session at',req.session.otpvalue)
  
  console.log('otp is ',otp.trim())
  
    if(op.otp===otp.trim()){
      console.log('successfully verified')
      const flag=helper.updateVerify(op.email)
      res.send(flag)
      req.session.destroy()
    }
  
  else{
    console.log('invalid otp entered')
    res.send(false)
  }
})



route.post('/login',async(req,res)=>{
 
   let userData=await helper.doLogin(req.body)
        
      //console.log(userData) 
      if(userData.flag){ 
        if(userData.verifiedflag){
          const otp= helper.generateOtp()
          helper.sendMail(userData.user.email,otp)
          userData.user.otp=otp
          req.session.userData=userData.user
        }else{
          
          const otp=await helper.generateOtp()
          const otpval={email:req.body.email,otp:otp}
          req.session.otpvalue=await otpval
          await helper.sendMail(userData.user.email,otp)
          console.log("email is at login page is ",userData.user.email)
          console.log('otp generated is at login',otp);
          
        }
      
        
        res.send(userData)
      }
      else{
        res.send(userData)
      }

})


route.post('/verifylogin',(req,res)=>{
  let op=req.session.userData
  nedate=new Date()
  const {otp}=req.body
  console.log('session at',req.session.userData)
  
  console.log('otp is ',otp.trim())
  
    if(op.otp===otp.trim()){
      console.log('successfully verified')
      res.send(true)
      req.session.userData.otp=''
    }
  
  else{
    console.log('invalid otp entered')
    res.send(false)
  }
})


route.get('/logout',(req,res)=>{
       
    req.session.destroy()
    console.log('logedout')
    res.json({flag:true})
})

route.post('/edituser',async(req,res)=>{
  let flag=await helper.doUpdate(req.body)
  if(flag){
    req.session.userData=req.body
    res.send({flag:flag})
  }
})

route.post('/editpassword',async(req,res)=>{
  const data={password:req.body,email:req.session.userData.email,}
  let flag=await helper.doUpdatePassword(data)

    res.send({flag:flag})

  
  
})

module.exports=route