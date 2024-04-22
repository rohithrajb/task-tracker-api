const express = require('express');
const router = express.Router();
const { createUser, getUsers, checkUser } = require('../controllers/user.controllers');

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/login')
    .post(checkUser);
    

module.exports = router;