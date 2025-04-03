/* eslint-disable complexity */
require('dotenv/config');
const userModel = require('../database/models/user');
const { tokenGenerator } = require('../utils/tokenRelated');
const { hashMd5Compare } = require('../utils/md5');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing.' });
    }
    
    const user = await userModel.find({ email });
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found.' }); 
    }

    if (!hashMd5Compare(password, user[0].password)) {
      return res.status(422).json({ message: 'Password is incorrect.' });
    }
    const { id, username, role } = user[0];
    
    const token = tokenGenerator({ data: { id, username, role, email } });

    return res.status(200).json({ token, user: { id, username, role, email } });
  } catch (err) {
    next(err);
  }
};

const userValidation = async (req, res) => 
  res.status(200).json({ 
      message: 'User validated.',
      status: 'OK',
  });

module.exports = {
    login,
    userValidation,
};
