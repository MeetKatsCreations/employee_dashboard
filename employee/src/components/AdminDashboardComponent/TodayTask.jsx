import React, { useEffect } from 'react';
import { useTasks } from '../../Context/TaskContext';

const TodayTasks = () => {
  const { fetchTasksDueToday, todayTasks } = useTasks();

  useEffect(() => {
    fetchTasksDueToday(); 
  }, []);

  if (!todayTasks || todayTasks.length === 0) {
    return <div className="p-6 text-gray-600 text-lg">No tasks due today 🎉</div>;
  }

  return (
    <div className="mt-8 mx-4 sm:mx-0">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">Tasks Due Today</h2>
     
      <div
        className="bg-white rounded-xl shadow-lg p-4  border-orange-500 w-50 sm:w-[550px] md:w-[650px] lg:w-[875px]  h-48 "
        style={{
          maxHeight: '500px',
          overflowY: 'auto', 
        }}
      >
        <div className="flex flex-wrap gap-4">
          {todayTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white mb-4 p-4 rounded-xl shadow-md border-l-4 border-orange-500  w-44 sm:w-56" // Ensures 3 cards per row
            >
              <h3
                className="text-lg font-semibold text-gray-800 truncate"
                title={task.title}
                style={{ wordBreak: 'break-word' }}
              >
                {task.title}
              </h3>
              <p
                className="text-gray-600 mt-2 truncate"
                title={task.description}
                style={{ wordBreak: 'break-word' }}
              >
                {task.description}
              </p>
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
    </div>
  );
};

export default TodayTasks;
