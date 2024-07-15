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
  const {email,otp}=req.body
  console.log('session at',req.session.otpvalue)
  
  console.log('otp is ',otp.trim())
  
    if(op.otp===otp.trim()){
      console.log('successfully verified')
    }
  
  else{
    console.log('invalid otp entered')
  }
})



route.post('/login',async(req,res)=>{
   let userData=await helper.doLogin(req.body)
        
      //console.log(userData) 
      if(userData.flag){ 
      req.session.userData=userData.user
      console.log(req.session.id);
        res.send(userData)
      }
      else{
        res.send(userData)
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