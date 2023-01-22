const express = require('express');

const route = express.Router()

const parkingController = require('../controller/parking-controller')

//create business
route.post('/vehicle/scan', parkingController)

//Get list of businesses
route.get('vehicle/ticket/:mobileNo',  parkingController)





module.exports = route