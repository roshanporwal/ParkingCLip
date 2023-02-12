const ApiResponse = require('../utils/api-response')
const AttendantDb = require('../database/models/attendantDb');
const UserDb = require('../database/models/userDb');
const USER_ROLE = require('../constants/role-constant')
const UserIdGenerator = require('../utils/user-id-generator')
const OtpUtility = require('../utils/otp-utility');
const BusinessDb = require('../database/models/businessDb');
/**
 * 
 * @param {any} business 
 * @param {any} user 
 * @returns 
 */
async function registerBusiness(business, user){
    console.log("Service received request for business registration ", business);
    //TODO: evaluate and process the request
    
    const userDb = new UserDb({
        mobileNo: business.businessContactNo ,
        name: business.businessName,
        role: USER_ROLE.BUSINESS_OWNER,
        userId: UserIdGenerator.getNextUserId(),
        isActive: false,
        otpDetails: OtpUtility.generateOTP()
    })
    business.businessId = userDb.userId
    const businessDb = new BusinessDb(business)
    try {
        await userDb.save()
        await OtpUtility.sendOtp(userDb.mobileNo, userDb.otpDetails.code)
        result = await businessDb.save()
        //convert result to API data          
        return new ApiResponse(201, 'Business Registered.', null, result)    
    } catch (error) {
        console.log("Error ",error.message)
        return new ApiResponse(500, 'Exception While Attendant Registration!.', null, error.message)
    }       
}
/**
 * 
 * @param {Number} page 
 * @param {Number} limit 
 * @param {any} user 
 */
async function getBusinessList(page, limit, user){
    console.log(page, limit)
    const pageOptions = {
        page: parseInt(page, 10) || 0,
        limit: parseInt(limit, 10) || 10
    }
    try {
        result = await BusinessDb.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Business List!.', null, error.message)
    }
    //TODO : update result for paggination link  
    return new ApiResponse(200, "Fetched Business list", null, result)
}

module.exports={
    registerBusiness, getBusinessList
}
