const mongoose = require("mongoose");
const dotenv = require("dotenv");

// stores .env variables in process.env
dotenv.config();

let dbConnection

module.exports = {
    connectToDb: (callback) => { // passed in to fire after connection made or err
        mongoose.connect(process.env.MONGO_URL, { // mongooose creates a connection between MongoDB and the Node.js
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }) 
        .then((client) => { // represents client we just got from db
            dbConnection = client.db() // sets dbConnection to db connection
            return callback()
        })
        .catch(err => {
            console.log(err) // logs err to console if err caught
            return callback(err)
        })
    },
    getDb: () => dbConnection // returns db connection to be used later
}