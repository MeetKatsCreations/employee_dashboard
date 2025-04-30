import React from 'react';

const TaskListComponent = ({ task }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-100">
      <td className="px-4 py-2 font-semibold text-gray-800 max-w-xs break-words whitespace-normal">
        {task.title}
      </td>
      <td className="px-4 py-2 text-gray-600 max-w-sm break-words whitespace-normal overflow-y-auto max-h-24">
        {task.description}
      </td>
      <td className="px-4 py-2 text-gray-800">{task.assignedTo.name}</td>
      <td
        className={`px-4 py-2 font-semibold ${
          task.status === 'not started'
            ? 'text-yellow-400'
            : task.status === 'ongoing'
            ? 'text-orange-400'
            : 'text-green-500'
        }`}
      >
        {task.status}
      </td>
      <td className="px-4 py-2 text-gray-600">
        {new Date(task.dueDate).toLocaleDateString()}
      </td>
    </tr>
  );
};

export default TaskListComponent;
