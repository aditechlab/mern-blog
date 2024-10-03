const express = require('express');
const cors = require('cors')
const { connect } = require('mongoose');
require('dotenv').config();

const app = express();
app.listen(5000, () => {
    console.log('Server started at port 5000')
});