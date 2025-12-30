const jws = require("jsonwebtoken")
const User = require("../model/userModel")
const dotenv = require("dotenv")
dotenv.config()

exports.isAuth = async (req,res,next)=>{
    const token = req.cookies?.token

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" })
    }
    const decoded = jws.verify(token, process.env.JWS_CODE)
    req.user = await User.findById(decoded.id)

     if (!req.user) {
        return res.status(401).json({ message: "User not found" })
    }

    next()
    
}
