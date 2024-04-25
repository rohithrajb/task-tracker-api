const User = require('../models/User');
const bcrypt = require('bcrypt');
const accessToken = require('../utils/token');

// POST /users/register
exports.createUser = async (req, res) => {
    try {
        // instead of creating a variable named salt (which by default generates a buffer of 10 rounds) and putting it as the second parameter for the below .hash() function, we can directly put 10 as the variable salt holds the same value by default
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = { name: req.body.name, email: req.body.email, password: hashedPassword };
        await User.create(user);

        res.status(201).json({ success: true, user });
    } catch (err) {
        res.status(500).json(`Err: ${err}`);
    }
}

// POST /users/login
exports.loginUser = async (req, res) => {
    // checking if the email exists
    const user = await User.findOne({email : req.body.email});
    if(user == null){
        return res.status(400).json('User not found');
    }
    
    try {
        // bcrypt.compare() removes the salt from user.password and compares the remaining hash with the hashed version of req.body.password
        if(await bcrypt.compare(req.body.password, user.password)) {
            const userData = { name: user.name, email: user.email, password: user.password };
            const token = accessToken(userData);
            res.status(200).json({ success: true, accessToken: token });
        }
        else {
            return res.status(401).json('Wrong credentials');
        }
    } catch (err) {
        res.status(500).json(`Err: ${err}`);
    }
}

// GET /users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(`Err: ${err}`);
    }
}