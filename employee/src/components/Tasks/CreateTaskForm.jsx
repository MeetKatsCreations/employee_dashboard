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
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white rounded-lg p-4 sm:p-6 md:p-8"
    >
      

      <div>
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Assign To</label>
        <select
          name="assignedTo"
          value={taskData.assignedTo}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={closeForm}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
