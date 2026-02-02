const express = require("express")
const { Addbooking, createBooking } = require("../controller/userbooking")
const { isAuth } = require("../middleware/isAuth")
const { createOrder, verifyPayment } = require("../controller/userController")

router = express.Router()

router.post('/addbooking/:id', Addbooking)
router.post('/create-order', createOrder)
router.post('/book', isAuth, createBooking)
router.post('/verify-payment', verifyPayment)

module.exports = router