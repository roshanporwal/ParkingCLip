const express = require('express');

const route = express.Router()

const attendantController = require('../controller/attendant-controller')
const RouteSecurity = require('../services/route-security-service')

//register attendant
route.post('/', RouteSecurity.autherizeRouteForAttendant, attendantController.registerAttendant)

//login attendant
route.post('/login',  attendantController.loginAttendant)

//get list of attendants
route.get('/', RouteSecurity.autherizeRouteForBusinessUser, attendantController.getAttendantsList)

//update attendant
route.put('/:attendantId', RouteSecurity.autherizeRouteForBusinessUser, attendantController.updateAttendant)

//get attendant by Id
route.get('/:attendantId', RouteSecurity.autherizeRouteForAttendant, attendantController.getAttendantById)

//delete attendant by Id
route.delete('/:attendantId', RouteSecurity.autherizeRouteForBusinessUser, attendantController.deleteAttendantById)


module.exports = route