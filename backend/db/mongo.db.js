const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.DB_URL;

class MongoDb {
    static async connect() {
        try {
            await mongoose.connect(mongoURI);
            console.log("Database is successfully connected");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }
}

module.exports = MongoDb;