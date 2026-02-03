const express = require("express")
const {createBooking, getMyBookings } = require("../controller/userbooking")
const { isAuth } = require("../middleware/isAuth")
const { createOrder, verifyPayment } = require("../controller/userController")

router = express.Router()

router.post('/create-order', createOrder)
router.post('/book', isAuth, createBooking)
router.post('/verify-payment', verifyPayment)
router.get('/my-bookings',isAuth, getMyBookings)

module.exports = router