/* eslint-disable max-lines-per-function */
const UserModel = require('../database/models/user');
const { hashMd5Encrypt } = require('../utils/md5');

const USER_NOT_FOUND = 'User not found';

// Responsible for fetching all users and excluding password field
module.exports.getAll = async (req, res, next) => {
    try {
        const list = await UserModel.find().select('-password');
        return res.status(200).json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Responsible for fetching a user by ID and excluding password field
module.exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const users = await UserModel.findById(id).select('-password');
        if (!users) {
            return res.status(404).json({ message: USER_NOT_FOUND });
        }
        return res.json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Responsible for creating a new user
module.exports.create = async (req, res, next) => {
    try {
        const { username, name, email, role, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.',
            });
        }
        const encryptedPassword = hashMd5Encrypt(password);
        const result = await UserModel.create({ 
            username, name, email, role, password: encryptedPassword });
            const userResponse = result.toObject();
            delete userResponse.password;
        return res.status(201).json({
            message: 'User created successfully.',
            user: userResponse,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Responsible for updating an existing user by ID
module.exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = req.body;

        if (newData.password) {
            newData.password = hashMd5Encrypt(newData.password);
        }

        const user = await UserModel.findByIdAndUpdate(id, newData, { new: true });

        if (!user) {
            return res.status(404).json({ message: USER_NOT_FOUND });
        }
        let userObj = {};
        if (user.password) {
            userObj = user.toObject();
            delete userObj.password;
        }

        return res.status(200).json(userObj);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Responsible for deleting a user by ID
module.exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: USER_NOT_FOUND });
        }
        return res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getAllTicketsByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id).populate('tickets');
        if (!user) {
            return res.status(404).json({ message: USER_NOT_FOUND });
        }
        return res.json(user.tickets);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
