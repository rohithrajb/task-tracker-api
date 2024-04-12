const express = require('express');
const dotenv = require('dotenv');
const Task = require('./models/Task');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');

const app = express();

dotenv.config({ path: './config/config.env' });

connectDB();

app.use(bodyParser.json());


// TASK ROUTES

// GET /tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();

        return res.status(200).json(tasks);
    } catch (err) {
        return res.status(500).json('Server Error');
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((err) => {
    //     res.send(err);
    // })
});

// POST /tasks
app.post('/tasks', async (req, res) => {
    try {
        const { text, day, reminder } = req.body;

        const task = await Task.create(req.body);

        return res.status(201).json(task);
    } catch (err) {
        console.log(err);
    }

    // let text = req.body.text;
    // let day = req.body.day;

    // let newTask = new Task({
    //     text, day
    // });
    // newTask.save().then((taskDoc) => {
    //     res.send(taskDoc);
    // })
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
    Task.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
    // try {
    //     const task = await Task.findById(req.params.id);

    //     if(!task) {
    //         return res.status(404).json('Task not found');
    //     }

    //     await task.remove();

    //     return res.status(200).json({});
    // } catch (error) {
    //     return res.status(500).json('Server Error');
    // }

    Task.findOneAndDelete({ 
        _id: req.params.id
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));