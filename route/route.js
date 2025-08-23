const express = require('express')
const route = express.Router()
const {
    upload,
    signUp,
    test,
    verifyOTP,
} = require('../controller/mainController')

route.post("/signUp",upload.single("profile"),signUp)
route.post("/verifyOtp",verifyOTP)
route.get("/test",test)






module.exports = {
    route
}
