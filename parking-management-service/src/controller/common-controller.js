const ApiResponse = require('../utils/api-response')
const CommonService = require('../services/common-service')

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
        res.status(result.statusCode)
        res.send(result)
    })

}

module.exports={
    uploadAttendantPhoto, generateOtp, userLogin
}

