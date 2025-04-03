const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * User schema for MongoDB.
 * 
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} role - The role of the user (e.g., admin, user).
 */
const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
});

module.exports = mongoose.model('User', UserSchema);