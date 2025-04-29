const express = require('express');
const router = express.Router();
const  authenticate  = require('../Middlewares/authenticate'); 
const { assignTask, getAssignedTasks, updateTaskStatus, getAllTasks } = require('../Controllers/taskController');

router.post('/assignTask', authenticate, assignTask);

router.get('/assignedTasks', authenticate, getAssignedTasks);

// router.patch('/updateTaskStatus', authenticate, updateTaskStatus);

// router.get('/getAllTasks', authenticate, getAllTasks);

module.exports = router;
