const ApiResponse = require('../utils/api-response')
const AttendantDb = require('../database/models/attendantDb');
const UserDb = require('../database/models/userDb');
const USER_ROLE = require('../constants/role-constant')
const UserIdGenerator = require('../utils/user-id-generator')
const OtpUtility = require('../utils/otp-utility')
/**
 * 
 * @param {any} attendant 
 * @param {any} user 
 * @returns 
 */
async function registerAttendant(attendant, user){
    console.log("Service received request ", attendant);
    //TODO: valiudate and proccess the request
    
    const userDb = new UserDb({
        mobileNo: attendant.mobileNo,
        name: `${attendant.firstName} ${attendant.middleName} ${attendant.lastName}`,
        role: USER_ROLE.ATTENDANT,
        userId: UserIdGenerator.getNextUserId(),
        isActive: false,
        otpDetails: OtpUtility.generateOTP()
    })
    attendant.attendantId = userDb.userId
    attendant.isOnDuty = true
    const attendantDb = new AttendantDb(attendant)
    
    try {
        await userDb.save()
        await OtpUtility.sendOtp(userDb.mobileNo, userDb.otpDetails.code)
        result = await attendantDb.save()
        //convert result to API data          
        return new ApiResponse(201, 'Attendant Registed.', null, result)    
    } catch (error) {
        console.log("Error while registering attendant ",error.message)
        return new ApiResponse(500, 'Exception While Attendant Registration!.', null, error.message)
    }       
}
/**
 * 
 * @param {Number} page 
 * @param {Number} limit 
 * @param {any} user 
 */
async function getAttendantsList(page, limit, user){
    console.log(page, limit)
    const pageOptions = {
        page: parseInt(page, 10) || 0,
        limit: parseInt(limit, 10) || 10
    }
    try {
        result = await AttendantDb.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Attendant List!.', null, err.message)
    }
    //TODO : update result for paggination link  
    return new ApiResponse(200, "Fetched Attendant list", null, result)
}

module.exports={
    registerAttendant, getAttendantsList
}
