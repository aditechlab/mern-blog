const mongoose = require('mongoose');
require('dotenv').config();
const Schema = mongoose.Schema;

const url = process.env.MONGO_URI;

const TestSchema = new Schema({
    name: String,
    value: Number,
});
const Test = mongoose.model('Test', TestSchema);

const connectDB = async () => {
    try {
        await mongoose.connect(url, {});
        
        const testDoc = new Test({ name: 'Sample Data', value: 42 });
        await testDoc.save();
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;