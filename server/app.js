const express = require('express');
const cors = require('cors')
require('dotenv').config();
const connectDB = require('./database/connection');

const app = express();
app.use(cors());


connectDB()
    .then(() => {
        const PORT = process.env.PORT;
        app.listen(3401, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log('Unable to run the server:', err);
    });