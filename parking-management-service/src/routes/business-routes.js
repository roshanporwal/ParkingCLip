const express = require('express');

const route = express.Router()
const RouteSecurity = require('../services/route-security-service')

const businessController = require('../controller/business-controller')

//register business
route.post('/',  businessController.createBusiness)

//Get list of businesses
route.get('/', RouteSecurity.autherizeRouteForAdminUser, businessController.getBusinessList)

//update business
route.put('/:businessId', RouteSecurity.autherizeRouteForBusinessUser, businessController.updateBusiness)

//Get business by id
route.get('/:businessId', RouteSecurity.autherizeRouteForAttendant, businessController.getBusinessById)

//Add Rate Structure
route.post('/rates', RouteSecurity.autherizeRouteForBusinessUser, businessController.addRateStructure)

//Get Rate Structure list
route.get('/rates/:businessId', RouteSecurity.autherizeRouteForBusinessUser, businessController.getRateStructureByBusinessId)

//Get Revenue per day
route.get('/revenue/:businessId', RouteSecurity.autherizeRouteForBusinessUser, businessController.getRevenuPerDayeByBusinessId)




module.exports = route