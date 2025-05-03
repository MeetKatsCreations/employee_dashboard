import React, { useEffect } from 'react';
import { useTasks } from '../../Context/TaskContext';

const TodayTasks = () => {
  const { filteredTasks, filterTasksDueToday } = useTasks();

  useEffect(() => {
    filterTasksDueToday();
  }, []);

  if (!filteredTasks || filteredTasks.length === 0) {
    return <div className="p-6 text-gray-600 text-lg">No tasks due today 🎉</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">Tasks Due Today</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map(task => (
          <div
            key={task._id}
            className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500"
          >
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Assigned To: {task.assignedTo?.name || 'N/A'}
            </p>
            <p className="text-sm text-gray-500">
              Status: <span className="font-medium">{task.status}</span>
            </p>
            <p className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayTasks;
