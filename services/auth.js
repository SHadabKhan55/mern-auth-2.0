const jwt = require("jsonwebtoken")

function setUser(user) {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      
}

function getUser(token){
    try {
        return jwt.verify(token,process.env.JWT_KEY)
    } catch (error) {
        if(error) throw new Error(`varification failed ${error.message}`);
    }
}

module.exports={
    setUser,
    getUser
}