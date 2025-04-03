const mongoose = require('mongoose');
const config = require('../config/config');

/**
 * Connects to the MongoDB database using Mongoose.
 * 
 * This function establishes a connection to the MongoDB database specified in the configuration.
 * It sets up event listeners to handle connection errors and logs a message when the connection is successfully opened.
 * 
 * @function
 * @name connectToDatabase
 */

module.exports = () => {
    mongoose.connect(config.atlasDb);

    const mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', () => {
        console.log('Connected to MongoDB.');
    });
};
