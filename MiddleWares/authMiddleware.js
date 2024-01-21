const jwt = require("jsonwebtoken")

function verifyToken(token){
    try {
        return jwt.verify(token,secret)
    } catch (error) {
        console.log(error);
    }
}

const requireAuth = (req,res,next)=>{
  try {
      const token = req.cookies.jwt
  } catch (error) {
    res.json({msg : "No cookie"})
    return // corrected
  }
    if (!token) {
        res.json({msg : "Please Login"})  // Replace this with redirect to the login page
        return
    }
    try {
        jwt.verify(token,"uyb8ct48o7phit8y95ty8095by852v8by52by8puy8bby8t0yn8tun095n045h[ih3q9put21cgnewq8u3yo8y;kkrhaliubiuqjbge1321321g321er2ya546hr8eh9879re7b489re8643a4gr5641g6v1654rg64g659ae879r7ey97y9797897y987a94e64a6r5444a4")
        next()
    } catch (error) {
        res.json({msg : "Incorrect Token"})
    }

}

module.exports = requireAuth