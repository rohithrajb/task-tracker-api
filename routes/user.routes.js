const express = require('express');
const router = express.Router();
const { createUser, getUsers, loginUser } = require('../controllers/user.controllers');

router.get('/', getUsers);

router.post('/register', createUser);

router.post('/login', loginUser);
    

module.exports = router;