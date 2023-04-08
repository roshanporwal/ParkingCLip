const axios = require('axios')


async function sendMessage(mobileNo, message){
    try {
        let url =`http://otpsms.vision360solutions.in/api/sendhttp.php?authkey=353289A0mspYzcgG6019898eP1&sender=DOCUCL&route=4&country=91&DLT_TE_ID=1207166850734947224&mobiles=${mobileNo}&message=${message} is your DOCUCLIP login verification code`

    // axios.get(url) 
    //         .then(res => console.log("Sent OTP :",res.data))
    //         .catch(err => console.log("error while sending OTP",err))
    } catch (error) {
        console.log("Error while sending sms : ",error)
    }
    
}

module.exports={
    sendMessage
}