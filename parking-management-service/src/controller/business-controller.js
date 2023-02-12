const Error = require('../utils/api-response')
const BusinessService = require('../services/business-service')

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
            console.log("Get list of attendant Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })

}

function updateBusiness(req, res, next){

}

function getBusinessById(req, res, next){

}


module.exports = {
    createBusiness,getBusinessList, updateBusiness, getBusinessById
}