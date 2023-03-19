const QRCode = require('qrcode')

async function generateQrcode(data){
    try {
        let qrcode = await QRCode.toDataURL(JSON.stringify(data))
        //console.log(qrcode)
        return qrcode    
    } catch (error) {
        return null
    }
    
}

module.exports = {
    generateQrcode
}