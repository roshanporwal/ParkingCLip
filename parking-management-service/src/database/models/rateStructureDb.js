const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rateStructureSchema = new Schema({
    vehicleType: {type: String, required: true},
    chargePerHr: {type: Number, required: true},
    chargePerDay: {type: Number},
    chargePerWeek: {type: Number},
    businessId: {type: String, required: true},
    minimumCharges: {type: String, required: true}
}, {timestamps: true})

const RateStructureDb = mongoose.model('rate-structure', rateStructureSchema)

module.exports = RateStructureDb