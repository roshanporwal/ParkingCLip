const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessSchema = new Schema({
        businessId: {type: String, required: true},
        businessName: {type: String, required: true}
})
const attendantSchema =  new Schema({
        attendantId: {type:String, required: true},
        firstName: {type:String, required: true},
        middleName: {type:String, required: true},
        lastName: {type:String},
        mobileNo: {type:String, required: true},
        aadharCardNo: {type:String, required: true},
        location: {type:String, required: true},
        photoName: {type:String, required: true},
        isOnDuty: {type:Boolean, required: true},
        business: businessSchema
        
},{timestamps: true})

const AttendantDb = mongoose.model('attendant', attendantSchema)

module.exports = AttendantDb;