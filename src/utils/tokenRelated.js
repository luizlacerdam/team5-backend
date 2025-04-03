const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../jwt.evaluation.key');

const secret = fs.readFileSync(filePath, { encoding: 'utf-8' });

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

function tokenGenerator(payload) {
  return jwt.sign(payload, secret, jwtConfig);
}

function tokenValidation(token) {
 return jwt.verify(token, secret);
}

module.exports = {
  tokenGenerator,
  tokenValidation,
};
