const jwt = require("jsonwebtoken")
const access_secret_key = process.env.ACCESS_SECRET_KEY
const refresh_secret_key = process.env.REFRESH_SECRET_KEY

// function for generating the access_token
const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    return jwt.sign(payload, access_secret_key, { expiresIn: '1m' });
};

// function for generating the refresh_token
const generateRefreshToken = () => {
    return jwt.sign({}, refresh_secret_key, { expiresIn: '3h' });
};

module.exports = { generateAccessToken, generateRefreshToken }