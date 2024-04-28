const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./mongoose');

const app = express();

dotenv.config({ path: './.env' });

connectDB();

const tasks = require('./routes/task.routes');

const users = require('./routes/user.routes');

app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(cors());

// USER ROUTES
app.use('/users', users);

// TASK ROUTES
app.use('/tasks', tasks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
