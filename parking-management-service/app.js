const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const path = require('path');

const app = express()
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 5000

app.use(bodyparser.urlencoded({ extended : true}))  

app.use('/parking-management-service/api/common', require('./src/routes/common-routes'))
app.use('/parking-management-service/api/businesses', require('./src/routes/business-routes'))
app.use('/parking-management-service/api/attendants', require('./src/routes/attendant-routes'))
app.use('/parking-management-service/api/parkings', require('./src/routes/parking-routes'))


app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});