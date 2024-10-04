const express = require('express');
const cors = require('cors')
const { connect } = require('mongoose');
require('dotenv').config();

const app = express();

//connect to db
connect(process.env.MONGO_URI).then(
app.listen(5000, () => {
    console.log(`Server started at port ${process.env.PORT}`)
})).catch(error => {console.log(error)});