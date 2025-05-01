import React from 'react';
import CreateTaskForm from '../Tasks/CreateTaskForm';

const AssignTaskModal = ({ onClose, existingTask }) => {
  return (
    <div className="fixed inset-0 bg-orange-50 bg-opacity-30 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-orange-600 mb-4">
          {existingTask ? 'Edit Task' : 'Assign New Task'}
        </h2>

        <CreateTaskForm closeForm={onClose} existingTask={existingTask} />
      </div>
    </div>
  );
};

export default AssignTaskModal;
