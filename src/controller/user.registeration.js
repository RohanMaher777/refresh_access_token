const db = require("../../config/db.config")
const User = db.User
const jwt = require("jsonwebtoken")
const secret_key = process.env.SECRET_KEY
const bcrypt = require("bcryptjs")
const generateToken = require("../services/generate_token")


//controller for new user registration  
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {

        const isEmptykey = Object.keys(req.body).some(key => {
            const value = req.body[key]
            return value === '' || value === null || value === undefined;
        })
        if (isEmptykey) {
            return res.status(400).json({ error: "please do not give empty fileds" })
        }


        const existingUser = await User.findOne({
            where: {
                email: email,
            }
        })

        if (existingUser) {
            return res.status(400).json({ error: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        

        const creatingUser = await User.create({
            name: name,
            email: email,
            password : hashedPassword
        })

        const access_token = generateToken.generateAccessToken(creatingUser)
        const refresh_token = generateToken.generateRefreshToken()

        creatingUser.refreshToken = refresh_token
        await creatingUser.save()

        res.cookie("refresh_token", refresh_token, { httpOnly: true })
        return res.status(200).json({
            status: true,
            message: "User risgter successfully",
            refresh_token: refresh_token,
            access_token : access_token
        })

    }
    catch (error) {
        console.log("error", error.message)
        return res.status(500).json({error : "Internal server error"})
    }
}

