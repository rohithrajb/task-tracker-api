const Task = require('../models/Task');
const transporter = require('../email');
const cron = require('node-cron');

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
        const task = await Task.findById(req.params.id);
        if(req.body.user.email === task.email){

            // send mail when the user makes request to turn on reminder. so at this point if should be false
            if(!task.reminder) {
                const mailOptions = {
                    from: 'prohibitedroti@gmail.com',
                    to: req.body.user.email,
                    subject: 'Task Tracker Reminder',
                    html: `<h3>Greetings ${req.body.user.name}, this email is your reminder for the task ${task.text}</h3>`
                }

                // scheduling the mail
                const now = new Date();
                const dateAndTime = `${now.getMinutes() + 1} ${now.getHours()} ${now.getDate()} ${now.getMonth() + 1} *`;
                console.log(dateAndTime);
                cron.schedule(dateAndTime, function () {
                    // nodemailer sendMail method
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) console.log(err);
                        else {
                            console.log(info.response);
                            console.log(`Sent mail to ${req.body.user.email}`);
                        }
                    })
                })
            }

            await Task.findByIdAndUpdate(req.params.id, { $set: req.body });
        }
        else {
            throw new Error('Not authorized ');
        }

        return res.status(200).json('Toggled task reminder; Sent mail');
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