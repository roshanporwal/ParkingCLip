const ApiResponse = require('../utils/api-response')
const ParkingTicketDb = require('../database/models/parkingTicketDb')
const AttendantDb = require('../database/models/attendantDb')
const QRCodeGenerator = require('../utils/qrcode-generator')
const { count } = require('../database/models/parkingTicketDb')
const PARKING_STATUS = require('../constants/parking-status')
const { v4: uuidv4 } = require('uuid');
const RateStructureDb = require('../database/models/rateStructureDb')
const VehicleDetailsDb = require('../database/models/vehicleDetailsDb')
const SmsService = require('../utils/sms-utility')
const UserRole = require('../constants/role-constant')


async function generateParkingTicket(payload, user){
    try {
        let attendantDb = await AttendantDb.findOne({attendantId: payload.attendantId})
        if(!attendantDb)
            return new ApiResponse(400, 'Invalid Attendant!', null, null)        
        await registerVehicle({vehicleRegistrationNo: payload.vehicleRegistrationNo, mobileNo: payload.mobileNo, vehicleType: payload.vehicleType})
        let parkingTicketDb = new ParkingTicketDb({
            ticketId: Math.random().toString(36).slice(5).toUpperCase(),
            vehicleRegistrationNo: payload.vehicleRegistrationNo,
            mobileNo: payload.mobileNo,
            attendantId: attendantDb.attendantId,
            attendantName: `${attendantDb.firstName} ${attendantDb.middleName} ${attendantDb.lastName}`,
            parkingLocation: attendantDb.location,
            entryDateTime: new Date(),
            vehicleType: payload.vehicleType,
            businessId: attendantDb.business.businessId,
            businessName: attendantDb.business.businessName,
            parkingStatus: PARKING_STATUS.PARKED,
            ticketPaymentDetails: {}

        })
        let qrcode = await QRCodeGenerator.generateQrcode({
            ticketId: parkingTicketDb.ticketId,
            vehicleRegistrationNo: payload.vehicleRegistrationNo,
            mobileNo: payload.mobileNo,
            attendantId: attendantDb.attendantId,
            attendantName: `${attendantDb.firstName} ${attendantDb.middleName} ${attendantDb.lastName}`,
            parkingLocation: attendantDb.location,
            entryDateTime: parkingTicketDb.entryDateTime,
            vehicleType: payload.vehicleType,
            businessId: attendantDb.business.businessId,
            businessName: attendantDb.business.businessName,
            parkingStatus: PARKING_STATUS.PARKED
        })
        parkingTicketDb.qrCode = qrcode
        parkingTicketDb = await parkingTicketDb.save()
        //send SMS to vehicle owner
        await SmsService.sendMessage(payload.mobileNo, `Thanks for prarking. Get ticket detaile ${process.env.SERVER_URL}/parkings/vehicle/ticketById/${parkingTicketDb.ticketId}`)
        return new ApiResponse(201, 'Parking Ticket Generated Successfully!', null, parkingTicketDb)    
    } catch (error) {
        console.log("Error ",error.message)
        return new ApiResponse(500, 'Exception While generating Parking ticket!.', null, error.message)
    }    
}
//TODO: restrict the access here
async function updateParkingTicketStatus(ticketId, status){
    if(!PARKING_STATUS[status])
        return new ApiResponse(400, 'Parking Ticket Status Is Invalid!', null, null)
    
    parkingTicketDb = await ParkingTicketDb.findOneAndUpdate({ticketId: ticketId}, {parkingStatus: PARKING_STATUS[status] ,
    exitDateTime:PARKING_STATUS[status] === PARKING_STATUS.EXITED ? new Date(): null}, {new: true})
    
    if(!parkingTicketDb)
        return new ApiResponse(400, 'Parking Ticket Id Is Invalid!', null, null)
    else return new ApiResponse(200, 'Parking Ticket Generated Successfully!', null, parkingTicketDb)       
}

async function getParkingTicket(mobileNo){
    try {
        let parkingTicketDb = await ParkingTicketDb.findOne({mobileNo: mobileNo})   
        if(!parkingTicketDb)
            return new ApiResponse(400, 'Invalid Mobile Number!', null, null)
        return new ApiResponse(200, 'Parking Ticket Fetched Successfully!', null, parkingTicketDb)    
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Parking ticket!.', null, error.message)
    }
}
//TODO: Restrict the access here
async function getParkingTicketById(ticketId){
    try {
        let parkingTicketDb = await ParkingTicketDb.findOne({ticketId: ticketId})   
        if(!parkingTicketDb)
            return new ApiResponse(400, 'Invalid ticketId!', null, null)
        if(parkingTicketDb.parkingStatus === PARKING_STATUS.PARKED){
            let rateStructureDb = await RateStructureDb.findOne({businessId: parkingTicketDb.businessId, location: parkingTicketDb.parkingLocation, vehicleType: parkingTicketDb.vehicleType})
            if(!rateStructureDb){
                return new ApiResponse(400, 'Rate Structure Is Not Define!', null, null)
            }
            let rent = rentCalculus(rateStructureDb, parkingTicketDb)
            parkingTicketDb.ticketPaymentDetails.parkingCharges = rent
            parkingTicketDb = await ParkingTicketDb.findByIdAndUpdate({_id:parkingTicketDb._id}, {ticketPaymentDetails: parkingTicketDb.ticketPaymentDetails}, {new: true})
        }
        //parkingTicketDb = await calculateParkingRent(parkingTicketDb)
        if(parkingTicketDb)    
            return new ApiResponse(200, 'Parking Ticket Fetched Successfully!', null, parkingTicketDb)    
        else
            return new ApiResponse(500, 'Exception While Fetching Parking ticket!.', null, error.message)

    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Parking ticket!.', null, error.message)
    }
}

// async function calculateParkingRent(parkingTicketDb){
//     try {
//         if(parkingTicketDb.parkingStatus === PARKING_STATUS.PARKED){
//             let rateStructureDb = await RateStructureDb.findOne({businessId: parkingTicketDb.businessId, location: parkingTicketDb.parkingLocation, vehicleType: parkingTicketDb.vehicleType})
//             let rent = rentCalculus(rateStructureDb, parkingTicketDb)
//             parkingTicketDb.ticketPaymentDetails.parkingCharges = rent
//             parkingTicketDb = await ParkingTicketDb.findByIdAndUpdate({_id:parkingTicketDb._id}, {ticketPaymentDetails: parkingTicketDb.ticketPaymentDetails})
//         }
//         return parkingTicketDb    
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }

function rentCalculus(rateStructureDb, parkingTicketDb){
    if(parkingTicketDb.isRentBasis){
        let parkedtimeInHr = Math.ceil((new Date().getTime() - parkingTicketDb.entryDateTime.getTime())/3600000 | 1); //createdAt
    
        let totalRent = 0
        let dayRent = 0
        let hrRent = 0
        let timeInHr = parkedtimeInHr
        if(!rateStructureDb.isDayEndMidnight && parkedtimeInHr>24 && rateStructureDb.maxCapping){
            dayRent = Math.floor(parkedtimeInHr/24) * rateStructureDb.maxDailyRent
            timeInHr = parkedtimeInHr%24
        } 
        
        hrRent = (rateStructureDb.rentPerHr*timeInHr)
        
        hrRent = hrRent < rateStructureDb.minimumCharges ? rateStructureDb.minimumCharges: hrRent
        hrRent = rateStructureDb.maxCapping && hrRent > rateStructureDb.maxDailyRent? rateStructureDb.maxDailyRent: hrRent  
        
        totalRent = (dayRent + hrRent) + (parkingTicketDb.isValletApplicable && rateStructureDb.isValletApplicable ? rateStructureDb.valletCharges :0)
        
        totalRent = Math.ceil(totalRent / rateStructureDb.roundingUpTo) * rateStructureDb.roundingUpTo   
        
        
        return {
            totalRent: totalRent,
            perHrRent: rateStructureDb.rentPerHr, 
            valletCharges: parkingTicketDb.isValletApplicable && rateStructureDb.isValletApplicable ? rateStructureDb.valletCharges :0,
            totalTimeHr: parkedtimeInHr            
        }
    }
    else return {
        totalRent: rateStructureDb.maxDailyRent        
    }


    
}

/**
 * 
 * @param {String} fromDate 
 * @param {String} toDate 
 * @param {Number} page 
 * @param {Number} limit 
 * @returns 
 */
async function getListOfParkingTicket(fromDate, toDate, page, limit, user, location = null){
    try {
        
        if(user.role == UserRole.BUSINESS_OWNER && !location)
            return new ApiResponse(400, 'Location is required!', null, null)

        let filter = [{businessId:{ $eq:user.businessId}},{parkingLocation:{$eq : location? location: user.location}}]    
        let recCount = await ParkingTicketDb.count({businessId:{ $eq:user.businessId}, parkingLocation:{$eq : location? location: user.location}})
        const pageOptions = {
            page: parseInt(page, 10) || 0,
            limit: parseInt(limit, 10) || 10
        }    
    
        
        if(fromDate && toDate){
            filter.push({created_on: {
                $gte: new Date(fromDate), 
                $lt: new Date(toDate)
            }})
        }    
        let parkingTicketDb = await ParkingTicketDb.find({ $and: filter })
                                                    .skip(pageOptions.page * pageOptions.limit)
                                                    .limit(pageOptions.limit)   
        
        if(!parkingTicketDb || parkingTicketDb.length == 0)
            return new ApiResponse(400, 'No Records Found!', null, null)
        
        let listData = {start: page, count: parkingTicketDb.length, totalCount: recCount, totalPages: Math.ceil(recCount/limit), data: parkingTicketDb}     
        return new ApiResponse(200, 'Parking Ticket Fetched Successfully!', null, listData)    
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Parking ticket!.', null, error.message)
    }
}
 async function registerVehicle(payload){
    try{
        let vehicle = await VehicleDetailsDb.findOne({vehicleRegistrationNo: payload.vehicleRegistrationNo, mobileNo: payload.mobileNo, vehicleType: payload.vehicleType})
        if(!vehicle){
            payload.qrCode = await QRCodeGenerator.generateQrcode(payload)
            vehicle = new VehicleDetailsDb(payload)
            vehicle = await vehicle.save()
            //TODO: need to send QR code to vehicle owner
        }
        return new ApiResponse(200, 'Vehicle registered Successfully!', null, vehicle)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Registering vehicle!.', null, error.message)
    }
 }

module.exports={
    generateParkingTicket, 
    getParkingTicket, 
    getListOfParkingTicket, 
    updateParkingTicketStatus, 
    getParkingTicketById,
    registerVehicle
}