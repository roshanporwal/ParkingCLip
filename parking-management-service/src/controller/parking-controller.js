
const ApiResponse = require('../utils/api-response')
const ParkingTicketService = require('../services/parking-service')

function scanVehicle(req, res, next){
    //req.body.file = req.files.file || null
    //console.log(req.files.file)
    ParkingTicketService.generateParkingTicket(req.body, req.user)
    .then(result=>{
        console.log("Parking ticket generated Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function getParkingTicket(req, res, next){
    ParkingTicketService.getParkingTicket(req.params.mobileNo)
    .then(result=>{
        console.log("Get Parking ticket Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function getParkingTicketById(req, res, next){
    ParkingTicketService.getParkingTicketById(req.params.ticketId)
    .then(result=>{
        console.log("Get Parking ticket By Id Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}


function updateParkingTicket(req, res, next){
    ParkingTicketService.updateParkingTicketStatus(req.params.ticketId,req.params.status)
    .then(result=>{
        console.log("Updated Parking ticket ststus Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function getListOfParkingTicket(req, res, next){

    ParkingTicketService.getListOfParkingTicket(req.query.businessId,req.query.fromDate,req.query.toDate,req.query.page,req.query.limit, req.user, req.query.location)
    .then(result=>{
        console.log("Get list of Parking ticket Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function registerVehicle(req, res, next){
    console.log("Register Vehicle request : ", req.body)
    ParkingTicketService.registerVehicle(req.body)
    .then(result=>{
        console.log("Register vehicle Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}
function getParkingTicketByVehicle(req, res, next){
    ParkingTicketService.getParkingTicketByVehicle(req.params.vehicleRegistrationNo, req.user)
    .then(result=>{
        console.log("Fetch Parking ticket by vehicle Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

module.exports = {
    scanVehicle, 
    getParkingTicket, 
    getListOfParkingTicket, 
    updateParkingTicket, 
    getParkingTicketById, 
    registerVehicle,
    getParkingTicketByVehicle
}