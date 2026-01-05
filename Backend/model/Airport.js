const mongoose = require("mongoose")

const AirportSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    code : {
        type : String,
        required : true,
        unique : true,
        uppercase : true,
        minlength : 3,
        maxlength : 3
    }
}, {timestamps : true})

module.exports = mongoose.model("Airport", AirportSchema)