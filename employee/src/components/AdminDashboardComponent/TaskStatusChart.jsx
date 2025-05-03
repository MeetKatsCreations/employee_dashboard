import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useTasks } from '../../Context/TaskContext';

const COLORS = ['#34d399', '#facc15', '#f87171']; // Completed, Ongoing, Not Started

const TaskStatusChart = () => {
  const { tasks } = useTasks();

  const statusCounts = {
    Completed: 0,
    Ongoing: 0,
    'Not Started': 0,
  };

  tasks.forEach(task => {
    if (task.status === 'completed') statusCounts.Completed++;
    else if (task.status === 'ongoing') statusCounts.Ongoing++;
    else if (task.status === 'not started') statusCounts['Not Started']++;
  });

  const data = [
    { name: 'Completed', value: statusCounts.Completed },
    { name: 'Ongoing', value: statusCounts.Ongoing },
    { name: 'Not Started', value: statusCounts['Not Started'] },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-48 ml-5 sm:ml-0 sm:w-80 h-[410px] mt-4 flex flex-col items-center mb-4 sm:mb-0">
      <h3 className="text-md font-semibold text-gray-700 mb-2">Task Status Overview</h3>

      <PieChart width={250} height={200}>
        <Pie
          data={data}
          cx={120}
          cy={100}
          innerRadius={50}
          outerRadius={65}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      
      <div className="mt-12 w-full px-2  ml-4 sm:ml-20">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center space-x-2 mb-1">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm sm:text-md text-gray-600 w-28">{entry.name}</span>
            <span className="text-sm sm:text-md font-medium text-gray-800">{entry.value}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TaskStatusChart;
