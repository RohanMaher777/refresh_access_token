const express = require("express")
const router = express.Router()
const {createUser} = require("../controller/user.registeration")
const {generate_access_token} = require("../controller/generateAccessToken")

router.post("/registeration", createUser )

router.get("/accesstoken", generate_access_token)


module.exports = router
