


console.log("hiii")

var v=window.localStorage.getItem("token")

document.getElementById('demo').innerHTML=v;
if (v==null) {
  console.log("bbbb");
  window.open("login.html")
}else{
  
}


document.getElementById("loginform").addEventListener("submit",(e)=>{
e.preventDefault();
var name = document.getElementById("nameid").value;
var password = document.getElementById("passwordid").value;

console.log(name);

fetch('/login',{
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    "name":name,
    "password":password
  })
}).then((res)=>{
     return res.json();
}).then((token)=>{
  window.localStorage.setItem("token",token)
})


})



document.getElementById("logout").addEventListener("click",(e)=>{
  e.preventDefault()
  window.localStorage.removeItem("token")
  
})