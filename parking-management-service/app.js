const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const path = require('path');
const fileUpload = require('express-fileupload')
const cors = require('cors')


const app = express()
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 5000

const MongodbConfig = require('./src/database/MongoDbConfig')
app.use(express.json())
app.use(cors())
app.use(bodyparser.urlencoded({ extended : true}))  
app.use(fileUpload())
app.use('/parking-management-service/api/commons', require('./src/routes/common-routes'))
app.use('/parking-management-service/api/businesses', require('./src/routes/business-routes'))
app.use('/parking-management-service/api/attendants', require('./src/routes/attendant-routes'))
app.use('/parking-management-service/api/parkings', require('./src/routes/parking-routes'))

MongodbConfig.connectMongoDb()
        .then((result)=>{
            console.log("Db connection has been established.")
            app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
        })
        .catch((err)=>{
            console.log("DB connection error :", err)
        })
