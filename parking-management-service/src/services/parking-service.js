const ApiResponse = require('../utils/api-response')
const ParkingTicketDb = require('../database/models/parkingTicketDb')
const AttendantDb = require('../database/models/attendantDb')
const QRCodeGenerator = require('../utils/qrcode-generator')
const { count } = require('../database/models/parkingTicketDb')

async function generateParkingTicket(payload){
    try {
        let attendantDb = await AttendantDb.findOne({attendantId: payload.attendantId})
        if(!attendantDb)
            return new ApiResponse(400, 'Invalid Attendant!', null, null)

        let qrcode = await QRCodeGenerator.generateQrcode(payload.mobileNo,"string")

        let parkingTicketDb = new ParkingTicketDb({
            vehicleRegistrationNo: "string",
            qrCode: qrcode,
            mobileNo: payload.mobileNo,
            attendantId: attendantDb.attendantId,
            attendantName: `${attendantDb.firstName} ${attendantDb.middleName} ${attendantDb.lastName}`,
            parkingLocation: attendantDb.location,
            entryDateTime: new Date(),
            vehicleType: payload.vehicleType,
            businessId: attendantDb.business.businessId,
            ticketPaymentDetails: {}

        })
        
        parkingTicketDb = await parkingTicketDb.save()
        //send SMS to vehicle owner
        return new ApiResponse(201, 'Parking Ticket Generated Successfully!', null, parkingTicketDb)    
    } catch (error) {
        console.log("Error ",error.message)
        return new ApiResponse(500, 'Exception While generating Parking ticket!.', null, error.message)
    }    
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
/**
 * 
 * @param {String} fromDate 
 * @param {String} toDate 
 * @param {Number} page 
 * @param {Number} limit 
 * @returns 
 */
async function getListOfParkingTicket(fromDate, toDate, page, limit){
    try {
        let recCount = await ParkingTicketDb.count()
        const pageOptions = {
            page: parseInt(page, 10) || 0,
            limit: parseInt(limit, 10) || 10
        }
        let parkingTicketDb = await ParkingTicketDb.find({
            created_on: {
                $gte: new Date(fromDate), 
                $lt: new Date(toDate)
            }
        })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)   
        if(!parkingTicketDb)
            return new ApiResponse(400, 'Invalid Mobile Number!', null, null)
        let listData = {start: page, count: parkingTicketDb.length, totalCount: recCount, totalPages: Math.ceil(recCount/limit), data: parkingTicketDb}     
        return new ApiResponse(200, 'Parking Ticket Fetched Successfully!', null, listData)    
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Parking ticket!.', null, error.message)
    }
}

module.exports={
    generateParkingTicket, getParkingTicket, getListOfParkingTicket
}