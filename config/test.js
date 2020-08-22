const b= require('bcrypt')

// b.hash("vicky",10,(err,ha)=>{
//     console.log(ha)
// })


b.compare("vick","$2b$10$u8sXuwA/u86Liy/Neh6BV.1Y3gEoKSeVKm5vYskwT1yA07g1k952q",function (err,t) {
   console.log(t);    
})

// $2b$10$u8sXuwA/u86Liy/Neh6BV.1Y3gEoKSeVKm5vYskwT1yA07g1k952q

