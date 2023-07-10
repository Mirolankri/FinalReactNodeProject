require('dotenv').config()
const { handleError } = require('../utils/errorHandler')
const { verifyAuthToken } = require('./providers/jwt')
const tokenGenerator = process.env.TOKEN_GENERATOR

const auth = (req, res, next) => {
    if(tokenGenerator === 'jwt'){
        try {
            const tokenFromClient = req.headers['x-auth-token']
            if(!tokenFromClient) throw new Error('בעיית זיהוי : נא לבצע התחברות.')

            const userInfo = verifyAuthToken(tokenFromClient)
            if(!userInfo) throw new Error('בעיית זיהוי : משתמש לא מורשה.')
            return next()
        } catch (error) {
            handleError(res, 401, error.message)
        }
    }

    return handleError(res, 500, 'You not use with JWT')
}

module.exports = auth