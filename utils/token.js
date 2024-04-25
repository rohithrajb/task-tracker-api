const jwt = require('jsonwebtoken');

const accessToken = (userData) => jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10d'});

module.exports = accessToken;