const express = require('express');

const route = express.Router()

const parkingController = require('../controller/parking-controller')

//scan vehicle
route.post('/vehicle/scan', parkingController.scanVehicle)

//Get parking ticket
route.get('/vehicle/ticket/:mobileNo',  parkingController.getParkingTicket)

//Get list of parking tickets
route.get('/vehicle/tickets',  parkingController.getListOfParkingTicket)





module.exports = route