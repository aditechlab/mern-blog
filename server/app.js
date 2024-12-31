const express = require('express');
const cors = require('cors')
require('dotenv').config();
const connectDB = require('./database/connection');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
// const upload = require('express-fileupload');
const path = require('path');

//middleware routes
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));

//file upload
// app.use(upload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use(notFound);
app.use(errorHandler);





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