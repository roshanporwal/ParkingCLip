
const mongoose = require('mongoose')
const dbUrl = `mongodb+srv://admin:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.9kbpr.mongodb.net/parking-management-service-${process.env.ENV}?retryWrites=true&w=majority`


function connectMongoDb(){
    console.log(dbUrl)
    return mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports={
    connectMongoDb
}
