const express = require('express');
// const { Db } = require('./config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('./config/db')
const user = require('./config/model')
const cookie= require('cookie-parser')
const session = require('express-session')
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express()


app.use(express.static("public"));

app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(session({
   secret:"vicky",
   resave:false,
   saveUninitialized:true
}))

app.route("/").get((req, res) => {


   // res.sendFile(__dirname + "/views/index.html")
   if(res.cookie==null){
      res.sendFile(__dirname + "/views/index.html")
   }

   res.send(res.cookie())

  
})



app.route('/signup').get((req, res) => {
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


app.route('/login').get((req, res) => {
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
app.route('/googlesignup').post(async(req,res)=>{
                    
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



db.then((result) => {
   app.listen(9000, () => {
      console.log("start");
   })
})