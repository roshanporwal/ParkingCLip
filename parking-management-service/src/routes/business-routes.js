const express = require('express');

const route = express.Router()
const RouteSecurity = require('../services/route-security-service')

const businessController = require('../controller/business-controller')

//register business
route.post('/',  businessController.createBusiness)

//Get list of businesses
route.get('/', RouteSecurity.autherizeRouteForBusinessUser, businessController.getBusinessList)

//update business
route.put('/:businessId', RouteSecurity.autherizeRouteForBusinessUser, businessController.updateBusiness)

//Get business by id
route.get('/:businessId', RouteSecurity.autherizeRouteForBusinessUser, businessController.getBusinessById)

//Add Rate Structure
route.post('/rates', RouteSecurity.autherizeRouteForBusinessUser, businessController.addRateStructure)

//Get Rate Structure list
route.get('/rates/:businessId', RouteSecurity.autherizeRouteForBusinessUser, businessController.getRateStructureByBusinessId)





module.exports = route