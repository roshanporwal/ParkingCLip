const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketPaymentDetailsSchema = new Schema({

})

const parkingTicketScema = new Schema({
    ticketId: {type: String, required: true},
    vehicleRegistrationNo: {type: String, required: true},
    qrCode: {type: String, required: true},
    mobileNo: {type: String, required: true},
    attendantId: {type: String, required: true},
    attendantName: {type: String, required: true},
    parkingLocation: {type: String, required: true},
    entryDateTime: {type: Date, required: true},
    vehicleType: {type: String, required: true},
    businessId:{type: String, required: true},
    parkingStatus: {type: String, required: true},
    ticketPaymentDetails: ticketPaymentDetailsSchema
    }
,{timestamps: true}
)

const ParkingTicketDb = mongoose.model('parking-ticket', parkingTicketScema)

module.exports = ParkingTicketDb
