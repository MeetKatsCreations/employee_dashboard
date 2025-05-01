import React, { useState } from 'react';
import { useTasks } from '../../Context/TaskContext';
const TaskCardComponent = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteTask } = useTasks();

  const handleDelete = async () => {
    await deleteTask(task._id);
    setIsModalOpen(false);
  };
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`cursor-pointer bg-white border border-orange-200 rounded-xl shadow-md p-4 m-4 w-40 sm:w-full max-w-sm transition duration-200 ${
          isModalOpen ? 'opacity-30 pointer-events-none' : ''
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">

          <h3 className="text-md md:text-xl font-medium text-gray-800 line-clamp-1">{task.title}</h3>
          <span
            className={`text-xs md:text-md px-2 py-1 rounded-full font-semibold w-28 text-center ${
              task.status === 'not started'
                ? 'bg-yellow-100 text-yellow-700'
                : task.status === 'ongoing'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {task.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{task.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          <span className="text-orange-600 font-medium">Assigned:</span> {task.assignedTo.name}
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-white opacity-20 z-0"></div>

          <div className="relative z-10 bg-white rounded-2xl border border-orange-300 shadow-xl w-[90%] max-w-xl p-6 flex flex-col justify-between overflow-visible">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <div className="space-y-4 overflow-visible">
              <h2 className="text-2xl font-semibold text-orange-700 whitespace-pre-wrap break-words">
                {task.title}
              </h2>

              <p className="text-base text-gray-800 whitespace-pre-wrap break-words">
                {task.description}
              </p>

              <div className="text-gray-700 mt-8 space-y-2">
                <p>
                  <strong className="text-orange-600">Status:</strong> {task.status}
                </p>
                <p>
                  <strong className="text-orange-600">Assigned To:</strong> {task.assignedTo.name}
                </p>
                <p>
                  <strong className="text-orange-600">Due Date:</strong>{' '}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <div className="flex justify-end gap-4 pt-4">
                <button
                  // onClick={handleEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCardComponent;
