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
    let businessDbExist = await UserDb.findOne({mobileNo: business.businessContactNo})
    if(businessDbExist){
        return new ApiResponse(400, 'Business Is Already Registered With Provided Business Contact No.', null, null)
    }
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
        //await OtpUtility.sendOtp(userDb.mobileNo, userDb.otpDetails.code)
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
    try {
        let rateStructure = await RateStructureDb.findOne({businessId: payload.businessId, vehicleType: payload.vehicleType, location: payload.location})
        if(rateStructure){
            delete payload.id
            rateStructure = await RateStructureDb.findByIdAndUpdate(rateStructure.id,payload)
            return new ApiResponse(201, "Updated Rate Structure Successfully.", null, rateStructure)
        }
        else if (!rateStructure) {
            rateStructure = new RateStructureDb(payload)
            rateStructure = await rateStructure.save()
            return new ApiResponse(201, "Added Rate Structure Successfully.", null, rateStructure)
        }
        else return new ApiResponse(400, 'Invalid Inputs!.', null, null)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Adding Rate Structure!.', null, error.message)
    }
}

async function getRateStructureByBusinessId(businessId){
    try {
        let rateStructures = await RateStructureDb.find({businessId: businessId})                        
        if(rateStructures){   
            return new ApiResponse(200, "Rate Structure Fetched Successfully.", null, rateStructures)
        }
        else return new ApiResponse(400, 'Invalid Inputs!.', null, null)   
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Rate Structure!.', null, error.message)

    }   
    
}
async function getBusinessById(businessId, user){
    try {
        let businessDb = await BusinessDb.findOne({businessId: businessId})
        if(businessDb){
            return new ApiResponse(200, "Business Fetched Successfully.", null, businessDb)
        }else return new ApiResponse(400, 'Invalid Business Id!.', null, null)
    }catch(error){
        return new ApiResponse(500, 'Exception While Fetching Business!.', null, error.message)
    }
}

async function updateBusiness(businessId, payload, user){
    try {
        let businessDb = await BusinessDb.findOne({businessId: businessId})
        if(businessDb){
            delete payload._id
            payload.businessId = businessId
            businessDb = await BusinessDb.findByIdAndUpdate({_id: businessDb._id},payload, {new: true})
            return new ApiResponse(200, "Business Updated Successfully.", null, businessDb)
        }else return new ApiResponse(400, 'Invalid Business Id!.', null, null)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Updating Business!.', null, error.message)
    }
}
module.exports={
    registerBusiness, getBusinessList, addRateStructure, getRateStructureByBusinessId, getBusinessById, updateBusiness
}
