const express=require('express')
const session=require('express-session')
const cors=require('cors')
const user=require('./user')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')

const app=express()
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  )
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(session({secret:'key',resave:false,saveUninitialized:false,cookie:{secure:false,maxAge:24*60*60*1000}}))
app.use(user)



app.listen(7000,()=>{
    console.log('server started...')
})
