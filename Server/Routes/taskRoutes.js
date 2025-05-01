const express = require('express');
const router = express.Router();
const  authenticate  = require('../Middlewares/authenticate'); 
const { assignTask, getAssignedTasks, updateTaskStatus, getAllTasks, getTasksByStatusForUser, getTasksByStatus, deleteTask, editTask } = require('../Controllers/taskController');

router.post('/assignTask', authenticate, assignTask);

router.get('/assignedTasks', authenticate, getAssignedTasks);

router.patch('/updateTaskStatus', authenticate, updateTaskStatus);

router.get('/getAllTasks', authenticate, getAllTasks);
router.get("/getTasksForUser",authenticate,getTasksByStatusForUser)
router.get("/getTasksByStatus",authenticate,getTasksByStatus)
router.put("/editTask/:id",authenticate,editTask)
router.delete("/deleteTask/:id",authenticate,deleteTask)
module.exports = router;
