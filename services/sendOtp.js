const mailer = require("nodemailer")

const crypto = require("crypto");

function generateOTP() {
  
  return crypto.randomInt(100000, 999999).toString();
}



async function sendOtp(recieverEmail, otp) {
    const transporter = mailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.USER,
            pass: process.env.APP_PASS,
        }
    });

    const mailOptions = {
        from: process.env.USER,
        to: recieverEmail,
        subject: "Verify your email",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    };

    // sendMail returns a Promise
    return transporter.sendMail(mailOptions);
}


module.exports = {
    generateOTP,
    sendOtp
}