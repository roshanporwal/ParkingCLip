const ApiResponse = require('../utils/api-response')
const AttendantDb = require('../database/models/attendantDb');
const UserDb = require('../database/models/userDb');
const USER_ROLE = require('../constants/role-constant')
const UserIdGenerator = require('../utils/user-id-generator')
const OtpUtility = require('../utils/otp-utility');
const BusinessDb = require('../database/models/businessDb');
const RateStructureDb = require('../database/models/rateStructureDb')
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
        var recCount = await BusinessDb.count()
        result = await BusinessDb.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Business List!.', null, error.message)
    }
    //TODO : update result for paggination link
    let listData = {start: page, count: result.length, totalCount: recCount, totalPages: Math.ceil(recCount/limit), data: result}   
    return new ApiResponse(200, "Fetched Business list", null, listData)
}

async function addRateStructure(payload){
    let rateStructure = await RateStructureDb.findOne({businessId: payload.businessId, vehicletype: payload.vehicletype})
    if(rateStructure){
        delete payload.id
        rateStructure = await RateStructureDb.findByIdAndUpdate(rateStructure.id,payload)
        return new ApiResponse(200, "Added Rate Structure Successfully.", null, rateStructure)
    }
    else return new ApiResponse(400, 'Invalid Inputs!.', null, null)
}

async function getRateStructureByBusinessId(businessId,page, limit){
    const pageOptions = {
        page: parseInt(page, 10) || 0,
        limit: parseInt(limit, 10) || 10
    }
    const recCount = await RateStructureDb.count({businessId: businessId})
    if(recCount == 0){
        return new ApiResponse(400, 'No Data Found, Please Correct Your Inputs!.', null, null)
    }
    let rateStructures = await RateStructureDb
                        .find({businessId: businessId})
                        .skip(pageOptions.page * pageOptions.limit)
                        .limit(pageOptions.limit)
    
    if(rateStructures){    
        let listData = {start: page, count: rateStructures.length, totalCount: recCount, totalPages: Math.ceil(recCount/limit), data: rateStructures}
        return new ApiResponse(200, "Rate Structure Fetched Successfully.", null, listData)

    }
}
module.exports={
    registerBusiness, getBusinessList, addRateStructure, getRateStructureByBusinessId
}
