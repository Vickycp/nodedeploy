const mongoose = require('mongoose')
const Schema = mongoose.Schema;



var myuser= new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});


var user = mongoose.model("Myuser",myuser)

module.exports= user;