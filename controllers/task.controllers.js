const Task = require('../models/Task');

// GET /tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ email: req.body.user.email });

        return res.status(200).json(tasks);
    } catch (err) {
        return res.status(500).json(`Server Error: ${err}`);
    }
};

// POST /tasks
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({ text: req.body.text, day: req.body.day, reminder: req.body.reminder, email: req.body.user.email });

        return res.status(201).json(task);
    } catch (err) {
        return res.status(500).json(`Server Error: ${err}`);
    }
};

// PUT /tasks/:id
exports.updateTask = async (req, res) => {
    try {
        const email = await Task.findById(req.params.id).then(task => task.email);
        if(req.body.user.email === email){
            await Task.findByIdAndUpdate(req.params.id, { $set: req.body });
        }
        else {
            throw new Error('Not authorized ');
        }

        return res.status(200).json('Toggled task reminder');
    } catch (err) {
        return res.status(500).json(`Server Error: ${err}`)
    }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json('Task not found');
        }

        await task.deleteOne();

        return res.status(200).json('Deleted task');
    } catch (err) {
        return res.status(500).json(`Server Error: ${err}`);
    }
};