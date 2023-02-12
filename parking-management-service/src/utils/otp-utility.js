const date = require('date-and-time')

function generateOTP()
{
    var digits = '0123456789';
    var otpLength = 4;
    var otp = '';
    for(let i=1; i<=otpLength; i++)
    {
        var index = Math.floor(Math.random()*(digits.length));
        otp = otp + digits[index];
    }
    return {code: otp,validTill:date.addMinutes(new Date(),3)};
}

async function sendOtp(mobileNo, otp){
    console.log("Sending OTP ", otp+" to ", mobileNo)

}

module.exports={
    generateOTP, sendOtp
}