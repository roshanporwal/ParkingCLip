const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessLocationSchema = new Schema({
    name:{type: String},
    address:{type: String},
    gpsCords:{type: String},
    locationType: {type: String},
    vehicleDetails: {type: [Object]}
    
})

const businessSchema = new Schema({
    businessId: {type: String, required: true},
    businessName: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: {type: String},
    businessContactNo: {type: String, required: true},
    personalContactNo: {type: String, required: true},
    businessAddress: {type: String, required: true},
    businessPincode: {type: String, required: true},
    personalAddress: {type: String, required: true},
    personalPincode: {type: String, required: true},
    businessEmailId: {type: String, required: true},
    personalEmailId: {type: String, required: true},
    gstNo: {type: String, required: true},
    pancardNo: {type: String, required: true},
    locations: {type: [businessLocationSchema], required: true}

} ,{timestamps: true})

const BusinessDb = mongoose.model('business', businessSchema)

module.exports = BusinessDb 