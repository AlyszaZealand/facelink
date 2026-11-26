const mongoose = require('mongoose');

const connectDB = async () => {
    const connectionString =
        process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/userdb';
    if (!connectionString) throw new Error('MONGO_URI mangler i .env');
    await mongoose.connect(connectionString);
    console.log('MongoDB tilsluttet');
};

module.exports = connectDB;