require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

const verifyAuthToken = (token) => {
    try {
        const userData = jwt.verify(token, JWT_KEY);
        return userData;
    } catch (error) {
        return null;
    }
}

module.exports = { verifyAuthToken }