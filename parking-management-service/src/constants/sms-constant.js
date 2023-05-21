
function getTicketGenerateSMSData(mobileNo, ticketId, vehicleRegistrationNo){
    return {
        mobileNo: mobileNo,
        message: `Thanks for parking your vehicle ${vehicleRegistrationNo} with us. Click on the below link to view the ticket ${process.env.SERVER_URL}/parkings/vehicle/ticketById/${ticketId}. - Parking-clip.com`,
        tmplId:"1207168240609254764"
    }
}

function getTicketExitSMSData(mobileNo, ticketId, vehicleRegistrationNo){
    return {
        mobileNo: mobileNo,
        message: `Your vehicle ${vehicleRegistrationNo} left our parking. Click on the below link to view the ticket ${process.env.SERVER_URL}/parkings/vehicle/ticketById/${ticketId}. - Parking-clip.com`,
        tmplId:"1207168240614235960"
    }
}

function getAttendantLoginOTPSMSData(mobileNo, otp){
    return {
        mobileNo: mobileNo,
        message: `${otp} is OTP for parking attendant login. Thanks, Parking-clip.com`,
        tmplId:"1207168015724544792"
    }
}

function getOwnerLoginOTPSMSData(mobileNo, otp){
    return {
        mobileNo: mobileNo,
        message: `${otp} is OTP for parking owner login.  Thanks, Parking-clip.com`,
        tmplId:"1207168015711083857"
    }
}

module.exports={
    getTicketGenerateSMSData,getAttendantLoginOTPSMSData,getOwnerLoginOTPSMSData, getTicketExitSMSData
}