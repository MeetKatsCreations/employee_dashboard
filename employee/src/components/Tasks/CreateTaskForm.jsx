import React, { useState } from 'react';
import { useTasks } from '../../Context/TaskContext';

const CreateTaskForm = ({ closeForm }) => {
  const { employees, createTask } = useTasks();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createTask(taskData);
    if (response.success) {
      closeForm(); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Assign New Task</h3>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Assigned To:
        <select
          name="assignedTo"
          value={taskData.assignedTo}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Create Task</button>
      <button type="button" onClick={closeForm}>
        Cancel
      </button>
    </form>
  );
};

export default CreateTaskForm;
