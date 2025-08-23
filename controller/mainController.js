const {User} = require('../model/userModel')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const {generateOTP,sendOtp} = require("../services/sendOtp")

//profile directory
const profileFolder = path.join(__dirname,'/../profile')

//create dir if not exist
if(!fs.existsSync(profileFolder)){
    fs.mkdirSync(profileFolder,{recursive:true})
}

//file storage setup
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        return cb(null,profileFolder)
    },
    filename:(req,file,cb) => {
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

//=========SIGNUP===============
const signUp = async (req,res)  => {
    try {
        const { name, email, password } = req.body;
        
        //for check if user submit empty field
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Name, email and password are required"
            });
        }
        
        //check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ //409 conflict
                success: false,
                msg: "Email already registered"
            });
        }

        //hash password 
        const pass = password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(pass,salt)
        req.body.password = hashPassword
        
        if(req.file) req.body.profile = req.file.filename
        
        //return 6 digit token
        const otp = generateOTP()
        
        //add token, expire date, 
        req.body.otp = otp
        req.body.otpExpires = Date.now() + 10 * 60 * 1000
        
        await User.create(req.body)
        
        await sendOtp(email,otp)        
        
        return res.status(201).json({ msg: "Signup successful, please verify OTP", success: true });
        
        
        
    }catch (error) {
        
        //delete file if record not create in db
        if (req.file) fs.unlinkSync(req.file.path)
            
            // 5. Handle mongoose validation errors
            if (error.name === "ValidationError") {
                return res.status(400).json({
                    success: false,
                    msg: "Validation error",
                    error: error.message
                });
            }
            
            return res.status(500).json({
                success: false,
                msg: "Signup failed",
                error: error.message
            });
            
        }
    }
    
    
//=========VERIFY-OTP-TOKEN===============

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const user = await User.findOne({ email });
        //is user not found
        if (!user) return res.status(404).json({ success: false, msg: "User not found" });
        
        //is email already varify
        if (user.isVerified) return res.status(400).json({ success: false, msg: "User already verified" });
        
        //check valid token or expiry time
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, msg: "Invalid or expired OTP" });
        }
        
        //update field in db
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        
        return res.status(200).json({ success: true, msg: "Email verified successfully" });
        
    } catch (error) {
        return res.status(500).json({ success: false, msg: "OTP verification failed", error: error.message });
    }
};

//=========LOGIN=============

const login = (req,res) => {
    
}




const test = (req,res) => res.send(`hello how do you do`)

module.exports = {
    signUp,
    upload,
    test,
    verifyOTP
}