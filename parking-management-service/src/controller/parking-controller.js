
const Error = require('../utils/error-response')

function scanVehicle(req, res, next){
    const mobileNo = req.body.mobileNo
    const file = req.files.file 
    
    console.log(mobileNo, file)
    res.send()

}

function getParkingTicket(req, res, next){
    const mobileNo = req.body.mobileNo

    res.send()
}

function getListOfParkingTicket(req, res, next){

    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const offset = req.body.offset;
    const limit = req.body.limit;

    res.send()



}


module.exports = {
    scanVehicle, getParkingTicket, getListOfParkingTicket
}