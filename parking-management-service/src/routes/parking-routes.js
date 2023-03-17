const express = require('express');

const route = express.Router()

const parkingController = require('../controller/parking-controller')
const RouteSecurity = require('../services/route-security-service')
//scan vehicle
route.post('/vehicle/generaTicket', parkingController.scanVehicle)

//Get parking ticket
route.get('/vehicle/ticket/:mobileNo', RouteSecurity.autherizeRouteForAttendant, parkingController.getParkingTicket)
route.get('/vehicle/ticketById/:ticketId', RouteSecurity.autherizeRouteForAttendant, parkingController.getParkingTicketById)

//Get list of parking tickets
route.get('/vehicle/tickets', RouteSecurity.autherizeRouteForAttendant, parkingController.getListOfParkingTicket)

//Get parking ticket
route.put('/vehicle/ticketStatus/:ticketId/:status', RouteSecurity.autherizeRouteForAttendant, parkingController.updateParkingTicket)

route.post('/vehicle/register', parkingController.registerVehicle)



module.exports = route