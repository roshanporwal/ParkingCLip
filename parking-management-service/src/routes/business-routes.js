const express = require('express');

const route = express.Router()

const businessController = require('../controller/business-controller')

//create business
route.post('/',  businessController.createBusiness)

//Get list of businesses
route.get('/',  businessController.getBusinessList)





module.exports = route