import React, { useState } from 'react';
import { useTasks } from '../Context/TaskContext';
import FilterBar from '../components/Tasks/FilterBar';
import TaskCard from '../components/Tasks/TaskCardComponent';
import AssignTaskModal from '../components/Tasks/AssignTaskModal';
const AdminTaskAssignment = () => {
  const {
    filteredTasks,
    loading,
    handleFilterChange,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 h-12">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Task Assignment</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-white py-2 px-4 w-32 rounded-lg shadow-md hover:bg-orange-600 mt-4 md:mt-0"
        >
          Assign Task
        </button>
      </header>

      
      {showForm && <AssignTaskModal onClose={() => setShowForm(false)} />}
      

      <FilterBar handleFilterChange={handleFilterChange}  />

      <div className="flex flex-wrap justify-start gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default AdminTaskAssignment;
