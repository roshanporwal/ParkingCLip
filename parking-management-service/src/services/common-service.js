const OtpUtility = require('../utils/otp-utility')
const UserDb = require('../database/models/userDb');
const ApiResponse = require('../utils/api-response')
const date = require('date-and-time')
const UserRole = require('../constants/role-constant')
const AttendantDb = require('../database/models/attendantDb')
const BusinessDb = require('../database/models/businessDb')

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
    console.log("User login service : ", loginDetails)
    try {
        userDb = await UserDb.findOne({mobileNo:loginDetails.mobileNo})
        if(!userDb){
            return new ApiResponse(404, 'User Not registered! Please Signup First.', null, null)
        }else{
            console.log(loginDetails.otp, userDb.otpDetails.code)
            if(loginDetails.otp !== userDb.otpDetails.code)
                return new ApiResponse(400, 'Invalid Otp!', null, null)
            // else if(userDb.otpDetails.validTill < new Date()){
            //     return new ApiResponse(400, 'Otp Expired!', null, null)
            // }
            else{
                userDb.isActive = true
                await userDb.save()
                var userLoginResponse = {}
                switch (userDb.role) {
                    case UserRole.ATTENDANT:
                        let attendantDb =await AttendantDb.findOneAndUpdate({attendantId: userDb.userId}, {isOnDuty: true}, {new : true})
                        console.log(attendantDb)
                        userLoginResponse.userName = userDb.name    
                        userLoginResponse.userId = userDb.userId
                        userLoginResponse.BusinessId = attendantDb.business.businessId
                        userLoginResponse.role = UserRole.ATTENDANT                       
                        break;
                    case UserRole.BUSINESS_OWNER:
                        userLoginResponse.userName = userDb.name
                        userLoginResponse.userId = userDb.userId
                        userLoginResponse.BusinessId = userDb.userId
                        userLoginResponse.role = UserRole.BUSINESS_OWNER                       
                        break;               
                    default:
                        userLoginResponse.userName = "Admin"
                        userLoginResponse.userId = "admin"
                        userLoginResponse.BusinessId = 'admin'
                        userLoginResponse.role = UserRole.ADMIN
                        break;
                }
                return new ApiResponse(200, `User logged in successfully.`, null, userLoginResponse)

            }    
        }    
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Business List!.', null, error.message)
    }
}

function isOtpExpired(dateTime){

}

module.exports={
    generateOtp, userLogin
}