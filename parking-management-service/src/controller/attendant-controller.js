const AttendantService = require('../services/attendant-service')
const ApiResponse = require('../utils/api-response')

function registerAttendant(req, res, next){
    console.log("Controller received request ", req.body);
    AttendantService.registerAttendant(req.body)
        .then(result=>{
            console.log("Register Attendant Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function loginAttendant(req, res, next){
    console.log(req.body)
    res.send();
}

function getAttendantsList(req, res, next){
    AttendantService.getAttendantsList(req.query.page, req.query.limit)
        .then(result=>{
            console.log("Get list of attendant Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })

}

function updateAttendant(req, res, next){

}

function getAttendantById(req, res, next){

}


module.exports = {
    registerAttendant, loginAttendant, getAttendantsList, updateAttendant, getAttendantById
}