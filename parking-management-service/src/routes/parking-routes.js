const express = require('express');

const route = express.Router()

const parkingController = require('../controller/parking-controller')

//scan vehicle
route.post('/vehicle/scan', parkingController.scanVehicle)

//Get parking ticket
route.get('/vehicle/ticket/:mobileNo',  parkingController.getParkingTicket)
route.get('/vehicle/ticketById/:ticketId',  parkingController.getParkingTicketById)

//Get list of parking tickets
route.get('/vehicle/tickets',  parkingController.getListOfParkingTicket)

//Get parking ticket
route.put('/vehicle/ticketStatus/:ticketId/:status',  parkingController.updateParkingTicket)





module.exports = route