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
  const[employeeCount,setEmployeeCount]=useState(0);
 const[assignedTaskCount,setAssignedTaskCount]=useState(0);
 const [todayTasks, setTodayTasks] = useState([]);
 const [taskCountByEmployee, setTaskCountByEmployee] = useState([]);


  const authHeaders = () => {
    const token = localStorage.getItem('userToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  

  const fetchAllTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/task/getAllTasks', authHeaders());
      const taskList=res.data.tasks||[];
      setTasks(taskList);
      setAssignedTaskCount(taskList.length)
      setFilteredTasks(res.data.tasks);
    } catch (err) {
      console.error('Error fetching all tasks:', err.response?.data?.message || err.message);
    }
  };
  const fetchTasksByStatus = async (status) => {
    try {
      const res = await axios.get(`http://localhost:5000/task/getTasksByStatus?status=${status}`, authHeaders());
      setFilteredTasks(res.data.tasks);
    } catch (err) {
      console.error('Error fetching tasks by status:', err.response?.data?.message || err.message);
    }
  };

  const updateTaskStatusByEmployee = async (taskId, status) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/task/updateTaskStatus`, 
        { taskId, status },
        authHeaders()
      );
      await fetchAssignedTasks(); 
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error('Error updating task status:', err.response?.data?.message || err.message);
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update task status',
      };
    }
  };
  
  const fetchAssignedTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/task/assignedTasks', authHeaders());
      setTasks(res.data.tasks);
      setFilteredTasks(res.data.tasks);
    } catch (err) {
      console.error('Error fetching assigned tasks:', err.response?.data?.message || err.message);
    }
  };
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/profile/getEmployees', authHeaders());
      const employeeList = res.data.employees || [];
      setEmployees(employeeList);
      setEmployeeCount(employeeList.length); 
    } catch (err) {
      console.error('Error fetching employees:', err.response?.data?.message || err.message);
    }
  };
  const createTask = async (taskData) => {
    try {
      const res = await axios.post('http://localhost:5000/task/assignTask', taskData, authHeaders());
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
        authHeaders()
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
      const res=await axios.delete(`http://localhost:5000/task/deleteTask/${id}`, authHeaders())
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
  const deleteEmployee=async(id)=>{
    try{
      const res=await axios.delete(`http://localhost:5000/profile/deleteEmployee/${id}`,authHeaders())
      await fetchEmployees();
      return { success: true, message: res.data.message };
    }catch(err){
      console.error('Error deleting  Employee:', err.response?.data?.message || err.message);
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
  const fetchTasksDueToday = async () => {
    try {
      const res = await axios.get('http://localhost:5000/task/taskToday', authHeaders());
      setTodayTasks(res.data.tasks || []);
    } catch (err) {
      console.error('Error fetching today\'s tasks:', err.response?.data?.message || err.message);
    }
  };
  const fetchTaskCountByEmployee = async () => {
    try {
      const res = await axios.get('http://localhost:5000/task/taskCount',authHeaders());
      console.log('API Response:', res.data); 

      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setTaskCountByEmployee(res.data.data); // <- this should be an array
      } else {
        setTaskCountByEmployee([]); // fallback if unexpected format
      }
    } catch (err) {
      console.error('Error fetching task count per employee:', err);
    }
  };
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('userToken'); 
      if (!token) return setLoading(false);
      const userRole = localStorage.getItem('userRole');
      await fetchEmployees();

      
  
      if (userRole === 'admin') {
        await fetchAllTasks();
      } else {
        await fetchAssignedTasks();
      }
  
      setLoading(false);
    };
  
    init();
  }, []);
  
  

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        employees,
        fetchTaskCountByEmployee,
        fetchEmployees,
        fetchAllTasks,
        todayTasks,
        updateTaskStatusByEmployee,
        fetchAssignedTasks,
        setAssignedTaskCount,
        taskCountByEmployee,
        createTask,
        loading,
        viewMode,
        toggleView,
        handleFilterChange,
        deleteTask,
        updateTask,
        deleteEmployee,
        employeeCount,
        fetchTasksDueToday,
        assignedTaskCount
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
