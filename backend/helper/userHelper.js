const database=require('../config/database')
const bycrypt=require('bcrypt')
const randomstring=require('randomstring')
const nodemailer = require('nodemailer')
const { promises } = require('nodemailer/lib/xoauth2')


module.exports={
    setData:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let flag=false
            let dbdata=await database.user.findOne({email:userData.email})
            console.log(dbdata)
            if(dbdata){
                resolve(false)

            }
            else{

           userData.password= await bycrypt.hash(userData.password,10)
           console.log(userData.password)
           userData.verified=false
            await database.user.insertOne(userData).then(console.log('data added'))
            flag=true
            resolve(flag)
            
            
            }
        })
    },

    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let dbdata=await database.user.findOne({email:userData.email})
        
            if(dbdata){
                if(await bycrypt.compare(userData.password,dbdata.password)){
                   if(dbdata.verified===true){
                    resolve({user:dbdata,flag:true,verifiedflag:true})
                   }else{
                    resolve({user:dbdata,flag:true,verifiedflag:false})
                   }
                   
                }
                else{
                    resolve({flag:false})
                }
                
            }
            else{
                resolve({flag:false})
            }

        })
    },

    doUpdate:(userData)=>{
        return new Promise(async(resolve,reject)=>{
           await database.user.updateOne({email:userData.email},{$set:{name:userData.name,age:userData.age}})
           resolve(true)
        })
    },

    doUpdatePassword:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            const dbdata=await database.user.findOne({email:userData.email})
            if(dbdata){
                if(await bycrypt.compare(userData.password.current,dbdata.password)){
                    userData.password.new=await bycrypt.hash(userData.password.new,10)
                    await database.user.updateOne({email:userData.email},{$set:{password:userData.password.new}})
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            }
        })
    },

    generateOtp:()=>{
        return randomstring.generate({length:4,charset:'numeric'})
    },

    sendMail:(email,otp)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'admin email address',
              pass: 'admin email password'
            }
          });
          
          var mailOptions = {
            from: 'admin email address',
            to: email,
            subject: 'Sending OTP conformation mail',
            text: `your otp is ${otp}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    },
    updateVerify:(email)=>{
        return new Promise(async(resolve,reject)=>{
           const dbdata=await database.user.findOne({email:email})
           if(dbdata){
            await database.user.updateOne({email:email},{$set:{verified:true}})
            resolve(true)
           }
           else{
            resolve(false)
           }
        })
       
    },

    doDelete:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            const dbdata=await database.user.findOne({email:userData.email})
            if(dbdata){
                await database.user.deleteOne({email:dbdata.email})
                resolve(true)
            }
            else{
                resolve(false)
            }
        })
    }


}