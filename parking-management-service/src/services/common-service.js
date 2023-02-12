const OtpUtility = require('../utils/otp-utility')
const UserDb = require('../database/models/userDb');
const ApiResponse = require('../utils/api-response')

async function generateOtp(mobileNo){
   try {
        userDb = await UserDb.findOne({mobileNo:mobileNo})
        if(userDb){
            otpDetails = OtpUtility.generateOTP();
            userDb.otpDetails = otpDetails
            await userDb.save()
            await OtpUtility.sendOtp(mobileNo, otpDetails.code)
            return new ApiResponse(200, `Otp sent on ${mobileNo} successfully.`, null, null)
        }
        else
            return new ApiResponse(404, 'User Not registered! Please Signup First.', null, null)    
   } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Business List!.', null, error.message)
   }
    

}

async function userLogin(loginDetails){

}

module.exports={
    generateOtp, userLogin
}