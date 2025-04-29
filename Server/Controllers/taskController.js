const Task = require('../Models/taskModel');
const User = require('../Models/userModel');

const assignTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;
  const assignedBy = req.userId;
  const role=req.role;
  if(role !== "admin"){
    return res.status(404).json({message:"Employee can not assign tasks."})
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
    
    res.status(200).json({ tasks }); // return empty array if no tasks
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports={assignTask,getAssignedTasks}