const mongoose = require('mongoose')
const Schema = mongoose.Schema;



var myuser= new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
var googleuser=new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})
var GoogleUser =mongoose.model("Googleuser",googleuser)
var user = mongoose.model("Myuser",myuser)

module.exports= {nuser:user,guser:GoogleUser};