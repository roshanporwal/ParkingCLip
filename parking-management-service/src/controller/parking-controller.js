
const ApiResponse = require('../utils/api-response')
const ParkingTicketService = require('../services/parking-service')

function scanVehicle(req, res, next){
    req.body.file = req.files.file
    console.log(req.files.file)
    ParkingTicketService.generateParkingTicket(req.body)
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

function getListOfParkingTicket(req, res, next){

    ParkingTicketService.getListOfParkingTicket(req.query.fromDate,req.query.toDate,req.query.page,req.query.limit)
    .then(result=>{
        console.log("Get list of Parking ticket Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}


module.exports = {
    scanVehicle, getParkingTicket, getListOfParkingTicket
}