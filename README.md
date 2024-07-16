**importnat info**  
Relace "admin email address" and "admin password" text with your email address and password in backend>helper>userhelper.js>sendMail fuction inorder to send email  
**Overview**  
This website uses a tech stack of:  
.Frontend:React  
.Backend:Node.js with Express framework  
.Database:MongoDB  
  
**API Documentation**

**Authentication APIs**  
.Sgin Up:POST /signup  
-Request Body:{name,email,age,password}  
-Response:{flag}  
.Email conformation:POST /verifyemail    
-Request Body:{otp}  
-Response:{flag}  
.Login:POST /login  
-Request Body:{email,password}  
-Response:{flag}  
.Login Verification:POST /verifylogin  
-Request Body:{otp}  
-Response:{flag}  
  
**User APIs**  
.Get Profile:GET /  
.Edit Data:POST /edituser  
-Request Body:{edited userdata object}  
-response:{flag}  
.Change Password:POST /editpassword  
-request Body:{oldpassword,newPassword}  
-response:{flag}  
.Logout:GET /logout  
  
**Frontend Documentation**  
.The frontend is built using React and uses Axios to make API calls to the backend.  
.The fontend has 8 pages:Sign Up,Email Conformation,Login,Login Verification,Home,Profile,Edit Data,and Change Password.  
  
**Database Documentation**  
.The database used is MongoDB  
.The mongoDB npm module is used to integrate the database with the APIs  
  
**Email Service Documentation**  
.NodeMailer is used to send OTP as mail  
.The email service is used for email conformation and login verification.  
.Session are used to keep and validate OTP.  
  
**Other information**  
.HTTP methods used are GET and POST.  
.Session are used to keep and validate OTP.  
  

**Screenshots**  
![Screenshot (64)](https://github.com/user-attachments/assets/0ba81361-acd0-43b0-9ad7-d8f5340abd69)  



