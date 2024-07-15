const userName=document.querySelector('input[type=text]')
const email=document.querySelector('input[type=email]')
const password=document.querySelector('input[type=password]')
const submit=document.querySelector('button')


submit.onclick=()=>{
   fetch('http://localhost:7000/signup',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        name:userName.value,
        email:email.value,
        password:password.value
    })
   }).then((res)=>res.json()).then((data)=>{if(!data){alert('user already exist')}else{window.location.href='./login.html'}})
    
}