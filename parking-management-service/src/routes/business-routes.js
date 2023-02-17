const express = require('express');

const route = express.Router()

const businessController = require('../controller/business-controller')

//register business
route.post('/',  businessController.createBusiness)

//Get list of businesses
route.get('/',  businessController.getBusinessList)

//update business
route.put('/:businessId',  businessController.updateBusiness)

//Get business by id
route.get('/:businessId',  businessController.getBusinessById)

//Add Rate Structure
route.post('/rates',  businessController.addRateStructure)

//Get Rate Structure list
route.get('/rates/:businessId',  businessController.getRateStructureByBusinessId)





module.exports = route