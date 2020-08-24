
const expre = require("express") 
const jwt = require('jsonwebtoken')
const user = require('../config/model')

const authrouts=expre.Router();

authrouts.get('/signup',(req, res) => {
    res.sendFile(__dirname + "/views/signup.html")
 }).post( (req, res) => {
    var name = req.body.name
    var password = req.body.password
 
    console.log(name)
    
    bcrypt.hash(password,10,async function(err,result){
       if(err) return res.sendStatus(401);
      var u = new user.nuser({
          name: name,
          password: result
       })
 
       await u.save((err, data) => {
          if (err) return res.statusCode(401);
          if (data != null) {
             console.log(data)
            var token= jwt.sign({user:data},'shhhhh')
            
              res.json(token);
             // res.cookie('v',token)
 
          } else {
 
           
             res.send("wait")
    
          }
       });
 
 
    })
 
 
  
 
 })
 
 
 authrouts.get('/login',(req, res) => {
    res.sendFile(__dirname + "/views/index.html")
 }).post(async (req, res) => {
    var name = req.body.name
    var password = req.body.password
 
 
    console.log(name);
 
    console.log(password);
    
     user.nuser.findOne({"name":name}).then((user)=>{
         
          bcrypt.compare(password,user.password,(err,result)=>{
                    
                 if(result ==true){
                       console.log(result)
                       var token= jwt.sign({user:user},'shhhhh')
                       res.json(token);
                      // req.session.token=token
                      //  res.cookie('token',token)
 
                 }else{
                    res.json({'statusCode':401})
                 }
 
          })
 
 
     })
  
 
 });
 authrouts.post('/google',async(req,res)=>{
                     
              var email=req.body.email;
              var name=req.body.name;
             var g=new user.guser({
                    email:email,
                    name:name
             })
             await g.save((err, data) => {
                // if (err) return res.statusCode(401);
                if (data != null) {
                   console.log(data)
                  var token= jwt.sign({user:data},'shhhhh')
                  
                   res.json(token);
                   // res.cookie('v',token)
       
                } else {
       
                   res.send("wait")
          
                }
             });
 
 })
 


 module.exports=authrouts