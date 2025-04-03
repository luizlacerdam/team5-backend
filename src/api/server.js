/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * 
 * @constant
 * @type {Object}
 * @requires ../database/mongoose
 */
const connection = require('../database/mongoose');

const app = require('./app');

const port = process.env.API_PORT || 3000;

connection();

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});