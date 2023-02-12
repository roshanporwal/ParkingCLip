const mongoose = require('mongoose')
const Schema = mongoose.Schema

const otpSchema = new Schema({
    code: {type: String},
    validTill: {type: Date}
})
const userDbSchema = new Schema({
    mobileNo: {type:String, required: true},
    email: {type:String},
    name: {type:String, required: true},
    role: {type:String},
    userId: {type:String, required: true},
    isActive: {type: Boolean, required: true},
    otpDetails: otpSchema
},{timestamps: true})

const UserDb = mongoose.model('user', userDbSchema)

module.exports = UserDb;