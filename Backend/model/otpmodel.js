const mongoose = require("mongoose")

const otpschema = new mongoose.Schema({
    otp : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    expireAt : {
        type : Date,
    }
})

module.exports = mongoose.model("OTP", otpschema)