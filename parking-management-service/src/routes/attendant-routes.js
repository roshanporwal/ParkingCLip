const express = require('express');

const route = express.Router()
const attendantController = require('../controller/attendant-controller')

//register attendant
route.post('/',  attendantController.registerAttendant)

//login attendant
route.post('/',  attendantController.loginAttendant)

//get list of attendants
route.get('/',  attendantController.getAttendantsList)

//update attendant
route.put('/',  attendantController.updateAttendant)

//get attendant by Id
route.get('/',  attendantController.getAttendantById)


module.exports = route