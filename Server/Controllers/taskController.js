const Task = require('../Models/taskModel');
const User = require('../Models/userModel');

const assignTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;
  const assignedBy = req.userId;
  const role = req.role;
  if (role !== "admin") {
    return res.status(404).json({ message: "Employee can not assign tasks." })
  }

  if (!assignedTo || !title || !description || !dueDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const employee = await User.findById(assignedTo);
    if (!employee || employee.role !== 'employee') {
      return res.status(404).json({ message: 'Employee not found or invalid role' });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      assignedTo,
      assignedBy,
    });

    await task.save();
    res.status(201).json({ message: 'Task assigned successfully', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getAssignedTasks = async (req, res) => {
  const userId = req.userId;

  try {
    const tasks = await Task.find({ assignedTo: userId }).populate('assignedBy', 'name email');

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const role = req.role;
    if (role !== "admin") {
      return res.status(404).json({ message: "Access denied for fetching task" })
    }
    const tasks = await Task.find({})
      .populate('assignedTo', 'name email')
      .populate('assignedBy', 'name email');
    return res.status(200).json({ message: "Task fetches successfully", tasks })
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err })
  }
}
const updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;
  const role = req.role;
  if (role !== "employee") {
    return res.status(404).json({ message: "Access denied" })
  }
  if (!['not started', 'ongoing', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  if (!taskId) {
    return res.status(400).json({ message: 'Task ID is required' });
  }
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.assignedTo.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this task' });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Task status updated', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getTasksByStatus = async (req, res) => {
  const { status } = req.query;
  const role = req.role;

  const allowedStatuses = ['not started', 'ongoing', 'completed'];
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can access this resource' });
  }


  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid or missing task status' });
  }

  try {
    const tasks = await Task.find({ status })
      .populate('assignedBy', 'name email')
      .populate('assignedTo', 'name email');

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



const getTasksByStatusForUser = async (req, res) => {
  const { status } = req.query;
  const userId = req.userId;

  const allowedStatuses = ['not started', 'ongoing', 'completed'];
  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid or missing task status' });
  }

  try {
    const tasks = await Task.find({ status, assignedTo: userId }).populate('assignedBy', 'name email');
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const editTask = async (req, res) => {
  const { id } = req.params;
  const role = req.role;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can edit tasks.' });
  }

  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'No updates provided.' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task updated successfully.', task: updatedTask });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const role = req.role;

  if (role !== "admin") {
    return res.status(403).json({ message: "Only admin can delete tasks." });
  }

  try {
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const taskToday=async(req,res)=>{
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); 

    const tasksDueToday = await Task.find({
      dueDate: {
        $gte: today,
        $lt: tomorrow
      }
    }).populate('assignedTo assignedBy');

    res.status(200).json({ tasks: tasksDueToday });
  } catch (error) {
    console.error('Error fetching today\'s tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
const getTaskCountPerEmployee = async (req, res) => {
  const role = req.role;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can access this resource' });
  }

  try {
    const taskCounts = await Task.aggregate([
      {
        $group: {
          _id: '$assignedTo',
          taskCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'employee',
        },
      },
      {
        $unwind: '$employee',
      },
      {
        $project: {
          _id: 0,
          employeeId: '$employee._id',
          name: '$employee.name',
          email: '$employee.email',
          taskCount: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data: taskCounts });
  } catch (error) {
    console.error('Error fetching task count per employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { assignTask,taskToday,getTaskCountPerEmployee, getAssignedTasks, getAllTasks, updateTaskStatus, getTasksByStatusForUser, getTasksByStatus ,editTask,deleteTask}