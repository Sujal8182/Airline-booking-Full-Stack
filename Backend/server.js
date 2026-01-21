const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const { connectDB } = require("./db/database")
const Airline_User = require("./routes/userRoutes")
const cookieParser = require("cookie-parser")
const userBooking = require("./routes/bookingroutes")
const Admin = require("./routes/Adminroutes")
dotenv.config()

const app = express()
app.use(
  cors({
    origin: ['http://localhost:5173',"http://localhost:5174"],
    credentials: true,               
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)
app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(cookieParser())
connectDB();

app.use('/airline/users', Airline_User)
// app.use('/airline/users', userBooking)
app.use('/airline/admin', Admin)

app.listen(process.env.PORT, ()=>{
    console.log(`Working on server ${process.env.PORT}`)
})