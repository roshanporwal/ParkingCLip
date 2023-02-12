const express = require('express');

const route = express.Router()

const attendantController = require('../controller/attendant-controller')

//register attendant
route.post('/',  attendantController.registerAttendant)

//login attendant
route.post('/login',  attendantController.loginAttendant)

//get list of attendants
route.get('/',  attendantController.getAttendantsList)

//update attendant
route.put('/:attendantId',  attendantController.updateAttendant)

//get attendant by Id
route.get('/:attendantId',  attendantController.getAttendantById)


module.exports = route