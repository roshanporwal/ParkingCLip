const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rateStructureSchema = new Schema({
    vehicleType: {type: String, required: true},
    businessId: {type: String, required: true},
    location: {type: String, required: true},
    rentPerHr: {type: Number, required: true},
    maxDailyRent: {type: Number},
    valletCharges: {type: Number, default: 0},
    maxCapping: {type: Boolean, default: false},
    roundingUp: {type: Boolean, default: false},
    roundingUpTo: {type:Number},
    minimumCharges: {type: Number, required: true}
}, {timestamps: true})

const RateStructureDb = mongoose.model('rate-structure', rateStructureSchema)

module.exports = RateStructureDb