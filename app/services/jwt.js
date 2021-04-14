const jwt = require('jsonwebtoken')




const JWT_SIGN_TOKEN = 'a0f5a7de261eb3e79da755c73a520af2'
module.exports = {

    generateTokenForUser: (userData, isAdmin) => {
        return jwt.sign({
            userId : userData.id,
            isAdmin : isAdmin
        },
        JWT_SIGN_TOKEN, {
            expiresIn: '1h'
        })
    },
    JWT_SIGN_TOKEN
}