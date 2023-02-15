const JWT = require('jsonwebtoken')

function generateJwt(payload){
    return new Promise((resolve, reject)=>{
        JWT.sign(payload, process.env.JWT_SECRETE, {}, (err, token)=>{
            if(err) reject(err)
            resolve(token)
        })
    })
}

module.exports = {
    generateJwt
}