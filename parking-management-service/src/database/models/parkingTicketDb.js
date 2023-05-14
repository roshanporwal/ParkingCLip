const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketPaymentDetailsSchema = new Schema({
    parkingCharges: {type: Object}
})

const vehicleLoction = new Schema({
    text:{type: String},
    gpsCords:{type: String},
    image:{type: String}
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
    exitDateTime:{type: Date},
    vehicleType: {type: String, required: true},
    businessId:{type: String, required: true},
    businessName: {type: String, required: true},
    parkingStatus: {type: String, required: true},
    isValletApplicable: {type: Boolean, default: false},
    isRentBasis: {Boolean, default: false},
    ticketPaymentDetails: ticketPaymentDetailsSchema,
    vehicleLocation: vehicleLoction,
    valletNumber:{type: String, default: "NA"}    
    }
,{timestamps: true}
)

const ParkingTicketDb = mongoose.model('parking-ticket', parkingTicketScema)

module.exports = ParkingTicketDb
