const Error = require('../utils/api-response')
const BusinessService = require('../services/business-service')
const ParkingTicketService = require('../services/parking-service')
function createBusiness(req, res, next){
    console.log("Controller received request for business registration ", req.body);
    BusinessService.registerBusiness(req.body)
        .then(result=>{
            console.log("Register Attendant Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}



function getBusinessList(req, res, next){
    BusinessService.getBusinessList(req.query.page, req.query.limit)
        .then(result=>{
            console.log("Get list of business Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })

}

function updateBusiness(req, res, next){
    BusinessService.updateBusiness(req.params.businessId, req.body,req.user)
        .then(result=>{
            console.log("Update business Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function getBusinessById(req, res, next){
    BusinessService.getBusinessById(req.params.businessId, req.user)
        .then(result=>{
            console.log("Get business by id Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function addRateStructure(req, res, next){
    BusinessService.addRateStructure(req.body)
        .then(result=>{
            console.log("Add rate structure Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}


function getRateStructureByBusinessId(req, res, next){
    BusinessService.getRateStructureByBusinessId(req.params.businessId)
    .then(result=>{
        console.log("Add rate structure Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function getRevenuPerDayeByBusinessId (req, res, next){
    ParkingTicketService.getRevenuPerDay(req.params.businessId,req.query.fromDate,req.query.toDate, req.query.location)
    .then(result=>{
        console.log("Get Revenue Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

module.exports = {
    createBusiness,getBusinessList, 
    updateBusiness, getBusinessById, addRateStructure, 
    getRateStructureByBusinessId, getRevenuPerDayeByBusinessId
}