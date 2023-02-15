const ApiResponse = require('../utils/api-response')
const CommonService = require('../services/common-service')
const JwtService = require('../services/jwt-service')

function uploadAttendantPhoto(req, res, next){
    res.send()
}


function generateOtp(req, res, next){
    console.log("Request recive in controller to generate otp")
    CommonService.generateOtp(req.params.mobileNo)
    .then(result=>{
        console.log("OTP generated Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}


function userLogin(req, res, next){
    CommonService.userLogin(req.body)
    .then(result=>{
        console.log("User login Conroller Result : ",result)
        if(result.statusCode === 200){
            JwtService.generateJwt(result.data)
                .then(token=>{
                    res.setHeader('Authorization', 'Bearer '+ token)
                    res.status(result.statusCode)
                    res.send(result)
                })
                .catch(err=>{
                    result = new ApiResponse(500, 'Error in generating access token!', null, null)
                    res.status(result.statusCode)
                    res.send(result)
                })
        }else{
            res.status(result.statusCode)
            res.send(result)
        }

        
    })

}

module.exports={
    uploadAttendantPhoto, generateOtp, userLogin
}

