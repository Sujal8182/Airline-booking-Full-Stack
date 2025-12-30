const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const { connectDB } = require("./db/database")
const Airline_User = require("./routes/userRoutes")
const cookieParser = require("cookie-parser")
const userBooking = require("./routes/bookingroutes")
dotenv.config()

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173', // React / Vite frontend
    credentials: true,               // allow cookies & auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)
app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(cookieParser())
connectDB();

app.use('/airline/users', Airline_User)
app.use('/airline/users', userBooking)

app.listen(process.env.PORT, ()=>{
    console.log(`Working on server ${process.env.PORT}`)
})