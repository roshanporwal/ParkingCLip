const date = require('date-and-time')
const axios = require('axios')

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

    let url =`http://otpsms.vision360solutions.in/api/sendhttp.php?authkey=353289A0mspYzcgG6019898eP1&sender=DOCUCL&route=4&country=91&DLT_TE_ID=1207166850734947224&mobiles=${mobileNo}&message=${otp} is your DOCUCLIP login verification code`

    // axios.get(url) 
    //         .then(res => console.log("Sent OTP :",res.data))
    //         .catch(err => console.log("error while sending OTP",err))
}

module.exports={
    generateOTP, sendOtp
}