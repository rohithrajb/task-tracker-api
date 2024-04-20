const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks.controllers');

router
    .route('/')
    .get(getTasks)
    .post(createTask);

router
    .route('/:id')
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;