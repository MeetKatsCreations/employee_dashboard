import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('userToken');

  
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  
  const fetchAllTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/task/getAllTasks', authHeaders);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error('Error fetching all tasks:', err.response?.data?.message || err.message);
    }
  };

  
  const fetchAssignedTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/task/assignedTasks', authHeaders);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error('Error fetching assigned tasks:', err.response?.data?.message || err.message);
    }
  };

  
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/profile/getEmployees', authHeaders);
      setEmployees(res.data.employees || []);
    } catch (err) {
      console.error('Error fetching employees:', err.response?.data?.message || err.message);
    }
  };

  
  const createTask = async (taskData) => {
    try {
      const res = await axios.post('http://localhost:5000/tasks/assign', taskData, authHeaders);
      await fetchAllTasks(); 
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error('Error creating task:', err.response?.data?.message || err.message);
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to create task',
      };
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!token) return setLoading(false);

      await fetchEmployees();
      await fetchAllTasks(); 
      setLoading(false);
    };

    init();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        employees,
        fetchEmployees,
        fetchAllTasks,
        fetchAssignedTasks,
        createTask,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
