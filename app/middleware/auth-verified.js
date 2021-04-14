const secret = require('../services/jwt')
const jwt = require('jsonwebtoken')



module.exports = function (req, res, next) {
       
   const authHeader =  req.headers['authorization']
   console.log(authHeader)

   
   const token = authHeader && authHeader.split(' ')[1]
   console.log(token)


    if(!token) return res.status(401).send('Accès denied');
   
    try {
       const verified = jwt.verify(token, secret.JWT_SIGN_TOKEN )

      req.user = verified

      next();


   } catch (err) {
       
    res.status(400).send("invalid token")
   }
}