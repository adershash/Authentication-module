const database=require('../config/database')
const bycrypt=require('bcrypt')
const randomstring=require('randomstring')
const nodemailer = require('nodemailer')


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
                   
                    resolve({user:dbdata,flag:true})
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
              user: 'adersh072@gmail.com',
              pass: 'aokp dblj tzpt yxqd'
            }
          });
          
          var mailOptions = {
            from: 'adersh072@gmail.com',
            to: email,
            subject: 'Sending Email conformation',
            text: `your otp is ${otp}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }


}