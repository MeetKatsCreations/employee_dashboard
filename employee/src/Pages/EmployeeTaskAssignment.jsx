import React, { useEffect, useState } from 'react';
import { useTasks } from '../Context/TaskContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeTaskAssignment = () => {
  const { filteredTasks, fetchAssignedTasks, updateTaskStatusByEmployee, loading } = useTasks();

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  
  const handleStatusChange = async (taskId, newStatus) => {
    const result = await updateTaskStatusByEmployee(taskId, newStatus);
    if (result.success) {
      toast.success(result.message); 
    } else {
      toast.error(result.message); 
    }
  };

  
  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  
  const renderTaskCard = (task) => (
    <div
      key={task._id}
      className={`bg-white p-6 rounded-lg shadow-lg  w-44 sm:w-full max-w-sm border border-orange-300 cursor-pointer ${
        isModalOpen && selectedTask?._id !== task._id ? 'opacity-50 pointer-events-none' : ''
      }`}
      onClick={() => openModal(task)}
    >
      <h3 className="text-2xl font-semibold text-orange-600 truncate">{task.title}</h3>
      <p className="text-gray-800 mt-2 truncate">{task.description}</p>
      <p className="text-gray-800 mt-2"><strong>Status:</strong> {task.status}</p>
      <p className="text-gray-800 mt-2"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );

  
  const renderModal = () => (
    <div className="fixed inset-0 flex justify-center items-center  bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-semibold text-orange-600 mb-4">{selectedTask.title}</h3>
        <p className="text-gray-800 mb-4">{selectedTask.description}</p>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            value={selectedTask.status}
            onChange={(e) => handleStatusChange(selectedTask._id, e.target.value)}
            disabled={loading}
            className="p-2 border border-orange-500 rounded-md w-full bg-orange-50 text-orange-700"
          >
            <option value="not started">Not Started</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center py-10 text-orange-600">Loading tasks...</div>;
  }

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-700">Your Assigned Tasks</h2>
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-700">No tasks assigned to you.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.map(renderTaskCard)}
        </div>
      )}

      {isModalOpen && renderModal()}

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop />
    </div>
  );
};

export default EmployeeTaskAssignment;
