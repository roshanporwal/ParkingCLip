const axios = require('axios')


async function sendMessage(smsData){
    try {
        let url =`http://otpsms.vision360solutions.in/api/sendhttp.php?authkey=353289A0mspYzcgG6019898eP1&sender=PRKCLP&route=4&country=91&DLT_TE_ID=${smsData.tmplId}&mobiles=${smsData.mobileNo}&message=${smsData.message}`
        console.log("SMS URL:", url)
    axios.get(url) 
             .then(res => console.log("Sent SMS Response by sms service :",res.data))
             .catch(err => console.log("error while sending OTP",err))
    } catch (error) {
        console.log("Error while sending sms : ",error)
    }
    
}

module.exports={
    sendMessage
}