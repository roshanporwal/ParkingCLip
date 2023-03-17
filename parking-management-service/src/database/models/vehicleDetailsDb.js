const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vehicleDetailsSchema = new Schema({
    vehicleRegistrationNo: {type:String, required: true},
    mobileNo: {type:String, required: true},
    vehicleType: {type: String, required: true},
    qrCode: {type: String}
},
{timestamps: true})

const VehicleDetailsDb = mongoose.model('vehicle-details', vehicleDetailsSchema)

module.exports = VehicleDetailsDb
