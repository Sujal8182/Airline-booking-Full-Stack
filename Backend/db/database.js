const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

exports.connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.ATLAS_URL)
        .then(()=> console.log("successfully connected"))
        .catch((err)=> console.log("something went wrong", err))
    } catch (error) {
        console.error(error)
    }
}