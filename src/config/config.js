const dotenv = require('dotenv');

dotenv.config({ path: './secrets.env' });

const password = process.env.DB_PASSWORD;

if (!password) {
    console.error('DB_PASSWORD is not defined in the environment');
} else {
    console.log('DB_PASSWORD is loaded successfully');
}

// Your connection string
const connectionString = 'mongodb+srv://gustavo213098:' 
    + `${password}@c1.3o2bb.mongodb.net/groupProject?retryWrites=true&` 
    + 'w=majority&appName=c1';

module.exports = {
    atlasDb: connectionString,
};