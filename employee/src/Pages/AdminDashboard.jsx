import React from 'react'
import { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import First from '../components/AdminDashboardComponent/First';
import SmallCard from '../components/AdminDashboardComponent/SmallCard';
import { useTasks } from '../Context/TaskContext';
import { useNotes } from '../Context/LogContext';
import TaskStatusChart from '../components/AdminDashboardComponent/TaskStatusChart';
import TodayTasks from '../components/AdminDashboardComponent/TodayTask';
import TaskBarChart from '../components/AdminDashboardComponent/TaskBarChart';
const AdminDashboard = () => {
  const { employeeCount, assignedTaskCount, fetchAllTasks } = useTasks()
  const { noteCount } = useNotes()
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllTasks();
  }, []);
  return (
    <div className="min-h-screen bg-orange-50  flex gap-0 flex-wrap  ">
      
      <div className='flex flex-wrap gap-4'>
        <First />
        <div className='flex flex-col'>
          <div className='flex gap-4 flex-wrap'>
            <SmallCard heading={"total number of employees"} count={employeeCount} />
            <SmallCard heading={"total number of tasks assigned"} count={assignedTaskCount} />
            <SmallCard heading={"total number of notes created"} count={noteCount} />
          </div>
          <TodayTasks />
        </div>

        <TaskStatusChart />
      </div>
      <TaskBarChart />
    </div>

  );
};

export default AdminDashboard; 