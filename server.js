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
const authrouts = require('./routs/authrouts');
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



const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.route("/").get((req, res) => {


   // res.sendFile(__dirname + "/views/index.html")
   if(res.cookie==null){
      res.sendFile(__dirname + "/views/index.html")
   }

   res.send(res.cookie())

  
})

app.use(authrouts)

db.then((result) => {
   app.listen(PORT, () => {
      console.log("start"+PORT);
   })
})