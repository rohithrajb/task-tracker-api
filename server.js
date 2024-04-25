const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

dotenv.config({ path: './config/config.env' });

connectDB();

const tasks = require('./routes/task.routes');

const users = require('./routes/user.routes');

app.use(bodyParser.json());

app.use(cors());

// CORS HEADERS MIDDLEWARE
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// USER ROUTES
app.use('/users', users);

// TASK ROUTES
app.use('/tasks', tasks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));