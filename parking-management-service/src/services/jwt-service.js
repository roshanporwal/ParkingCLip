const JWT = require('jsonwebtoken')

function generateJwt(payload){
    return new Promise((resolve, reject)=>{
        JWT.sign(payload, process.env.JWT_SECRETE, {}, (err, token)=>{
            if(err) reject(err)
            resolve(token)
        })
    })
}

function decodeJWT(token){
    var decoded = JWT.verify(token, process.env.JWT_SECRETE);
    console.log("JWT decoded : ",decoded)
    return decoded
}
module.exports = {
    generateJwt, decodeJWT
}