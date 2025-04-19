import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth(); 
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || "Admin"}</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
