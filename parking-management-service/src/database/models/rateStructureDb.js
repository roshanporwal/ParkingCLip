const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rateStructureSchema = new Schema({
    vehicleType: {type: String, required: true},
    businessId: {type: String, required: true},
    location: {type: String, required: true},
    rentPerHr: {type: Number, required: true},
    maxCapping: {type: Boolean, default: false},
    maxDailyRent: {type: Number},
    valletCharges: {type: Number, default: 0},    
    roundingUpTo: {type:Number, default:1},
    minimumCharges: {type: Number, required: true},
    isValletApplicable:{type: Boolean},
    isDayEndMidnight:{type: Boolean, default: false}
}, {timestamps: true})

const RateStructureDb = mongoose.model('rate-structure', rateStructureSchema)

module.exports = RateStructureDb