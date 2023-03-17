const express = require('express');

const route = express.Router()
const CommonController = require('../controller/common-controller')

route.post('/attendants/photo/upload', CommonController.uploadAttendantPhoto)
    
route.get('/otp/generate/:mobileNo', CommonController.generateOtp)

route.post('/login', CommonController.userLogin)

route.get('/userInfo', CommonController.getUserInfo)







module.exports = route