const express = require('express');

const route = express.Router()
const CommonController = require('../controller/common-controller')
const RouteSecurity = require('../services/route-security-service')


route.post('/attendants/photo/upload', CommonController.uploadAttendantPhoto)
    
route.get('/otp/generate/:mobileNo', CommonController.generateOtp)

route.post('/login', CommonController.userLogin)

route.get('/userInfo', CommonController.getUserInfo)

route.get('/user/ticket/:ticketId', CommonController.getUserParkingTicket)

//Activate Or Deactivate user
route.put('/users/activateOrdeactivate/:userId/:status', RouteSecurity.autherizeRouteForAdminUser, CommonController.activateOrDeactivateUser)

//Get user by role
route.get('/users/:role', RouteSecurity.autherizeRouteForAdminUser, CommonController.getUsersByRole)

//Get all parking  tickets by business and location
route.get('/vehicles/:businessId', RouteSecurity.autherizeRouteForAttendant, CommonController.getvehicles) 

//Get all parking  tickets by business and location
route.get('/vehicles/qrcode/:vehicleRegistrationNo', CommonController.getvehiclesQrCode) 







module.exports = route