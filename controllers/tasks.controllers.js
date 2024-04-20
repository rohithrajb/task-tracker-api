const Task = require('../models/Task');

// GET /tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        return res.status(200).json(tasks);
    } catch (err) {
        return res.status(500).json(`Server Error: ${err}`);
    }
};

// POST /tasks
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        return res.status(201).json(task);
    } catch (err) {
        return res.status(500).json(`Server Error: ${err}`);
    }
};

// PUT /tasks/:id
exports.updateTask = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, { $set: req.body });

        return res.status(200).json('Toggled task reminder');
    } catch (err) {
        return res.status(500).json(`Server Error: ${err}`)
    }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json('Task not found');
        }

        await task.deleteOne();

        return res.status(200).json('Deleted task');
    } catch (err) {
        return res.status(500).json(`Server Error: ${err}`);
    }
};