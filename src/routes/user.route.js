const express = require("express")
const router = express.Router()
const {createUser} = require("../controller/user.registeration")
const {generate_access_token} = require("../controller/generateAccessToken")

//route for new user registration 
router.post("/registeration", createUser )

// route for generating the access_token using refresh_token
router.get("/accesstoken", generate_access_token)


module.exports = router
