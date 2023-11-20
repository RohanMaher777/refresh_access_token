const jwt = require("jsonwebtoken")
const db = require("../../config/db.config")
const User = db.User
const generateToken = require("../services/generate_token")
const refresh_secret_key = process.env.REFRESH_SECRET_KEY

exports.generate_access_token = async (req, res) => {
 

    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Access token expired, refresh token not found' });
        }

        const decodedRefreshToken = jwt.verify(refreshToken, refresh_secret_key);
        const user = await User.findOne({ where: { refreshToken : refreshToken} });

        if (!user || !decodedRefreshToken) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        const access_token_new = generateToken.generateAccessToken(user);

        return res.status(200).json({ access_token: access_token_new, });

    } catch (error) {
        console.log("error", error.message)
        return res.status(500).json({error : "Internal server error"})
    }
}