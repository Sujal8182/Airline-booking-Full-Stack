const mongoose = require("mongoose")

const Bookingschema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    depart : {
        type : String,
        required : true
    },
    return : {
        type : String,
    },


},{timestamps : true})

module.exports = mongoose.model("booking", Bookingschema)