const express = require('express');
// const { Db } = require('./config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('./config/db')
const user = require('./config/model')
const bodyparser = require('body-parser')
const app = express()


app.use(express.static("public"));

app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())

app.route("/").get((req, res) => {
//   var v= localStorage.getItem("v")
//   console.log(v);

   res.sendFile(__dirname + "/views/index.html")

  
})



app.route('/signup').get((req, res) => {
   res.sendFile(__dirname + "/views/signup.html")
}).post( (req, res) => {
   var name = req.body.name
   var password = req.body.password

   console.log(name)
   
   bcrypt.hash(password,10,async function(err,result){
      if(err) return res.sendStatus(401);
     var u = new user({
         name: name,
         password: result
      })

      await u.save((err, data) => {
         if (err) return res.statusCode(401);
         if (data != null) {
            console.log(data)
           var token= jwt.sign({user:data},'shhhhh')
            res.json(token);
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
   
    user.findOne({"name":name}).then((user)=>{
        
         bcrypt.compare(password,user.password,(err,result)=>{
                   
                if(result ==true){
                      console.log(result)
                      var token= jwt.sign({user:user},'shhhhh')
                      res.json(token);

                }else{
                   res.json({'statusCode':401})
                }

         })


    })
 

})



db.then((result) => {
   app.listen(9000, () => {
      console.log("start");
   })
})