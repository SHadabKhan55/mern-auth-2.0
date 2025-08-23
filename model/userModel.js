const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female"],
        default:"male",
        required:true
    },
    profile:{
        type:String,
        default:"",
        required:true

    },
    isVerified: {
         type: Boolean,
         default: false 
        },
    otp: String,
    otpExpires: Date
})

const User = mongoose.model("users",userSchema)
module.exports ={
    User
}