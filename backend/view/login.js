const email=document.querySelector('input[type=email]')
const password=document.querySelector('input[type=password]')
const loginbtn=document.querySelector('button')
const displayUser=document.querySelector('div')


loginbtn.onclick=()=>{
    fetch('http://localhost:7000/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email.value,
            password:password.value
        })
    }).then((res)=>res.json()).then((data)=>{
        if(data.logedIn){
             let para=`<h1>${data.user.name}</h1>`
             document.querySelector('div').insertAdjacentHTML('beforeend',para)
            
        }else{alert('username or password miss match')}})

}