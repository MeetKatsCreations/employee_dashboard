import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('card');
  const [filter, setFilter] = useState('');

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
      setFilteredTasks(res.data.tasks);
    } catch (err) {
      console.error('Error fetching all tasks:', err.response?.data?.message || err.message);
    }
  };
  const fetchTasksByStatus = async (status) => {
    try {
      const res = await axios.get(`http://localhost:5000/task/getTasksByStatus?status=${status}`, authHeaders);
      setFilteredTasks(res.data.tasks);
    } catch (err) {
      console.error('Error fetching tasks by status:', err.response?.data?.message || err.message);
    }
  };


  const fetchAssignedTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/task/assignedTasks', authHeaders);
      setTasks(res.data.tasks);
      setFilteredTasks(res.data.tasks);
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
      const res = await axios.post('http://localhost:5000/task/assignTask', taskData, authHeaders);
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
  const updateTask = async (id, updates) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/task/editTask/${id}`,
        updates,
        authHeaders
      );
      await fetchAllTasks();
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error('Error editing task:', err.response?.data?.message || err.message);
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to edit task',
      };
    }
  };
  const deleteTask = async (id) => {
    try {
      const res=await axios.delete(`http://localhost:5000/task/deleteTask/${id}`, authHeaders)
      await fetchAllTasks(); 
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error('Error deleting  task:', err.response?.data?.message || err.message);
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to create task',
      };
    }
  }
  const handleFilterChange = (status) => {
    setFilter(status);

    if (status === '') {
      fetchAllTasks();
    } else {
      fetchTasksByStatus(status);
    }
  };
  const toggleView = (view) => {
    setViewMode(view);
  };

  useEffect(() => {
    const init = async () => {
      if (!token) return setLoading(false);

      await fetchEmployees();
      await fetchAllTasks();
      setLoading(false);
    };

    init();
  }, [token]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        employees,
        fetchEmployees,
        fetchAllTasks,
        fetchAssignedTasks,
        createTask,
        loading,
        viewMode,
        toggleView,
        handleFilterChange,
        deleteTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
