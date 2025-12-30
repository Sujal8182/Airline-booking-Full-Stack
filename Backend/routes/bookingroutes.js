const express = require("express")
const { Addbooking } = require("../controller/userbooking")

router = express.Router()

router.post('/addbooking/:id', Addbooking)

module.exports = router