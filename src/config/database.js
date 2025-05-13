const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const  MONGO_URI  = 'mongodb://AbsofuckinlitlysomeoneUserfuck:suckmydickjustonefuckingtest@109.73.196.37:27017/change?authSource=admin&directConnection=true';
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
    }
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error('MongoDB disconnection error:', error);
        process.exit(1);
    }
}
module.exports = {
    connectDB,
    disconnectDB,
};
