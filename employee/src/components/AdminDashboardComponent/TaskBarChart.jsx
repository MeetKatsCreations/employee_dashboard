import React, { useEffect, useState } from 'react';
import { useTasks } from '../../Context/TaskContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const TaskBarChart = () => {
  const { taskCountByEmployee, fetchTaskCountByEmployee } = useTasks();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    fetchTaskCountByEmployee();

    
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); 
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = Array.isArray(taskCountByEmployee) ? taskCountByEmployee : [];
  const barWidth = isSmallScreen ? 60 : 100;  

  const totalWidth = data.length * barWidth;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mx-4 mb-4 w-full">
      <h2 className="text-xl font-semibold text-orange-600 mb-4">
        Task Distribution by Employee
      </h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No data to display</p>
      ) : (
        <div className="overflow-x-auto">
          <div
            style={{
              width: '100%',
              minWidth: totalWidth, 
              height: '400px',
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="taskCount" fill="#fb923c" width={barWidth} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBarChart;
