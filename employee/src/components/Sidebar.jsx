// src/components/Sidebar.jsx
import { useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { 
  Home, 
  User, 
  CheckSquare, 
  Calendar, 
  Settings, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  LogOut
} from 'lucide-react';
import img from '../assets/logo.jpg'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const baseRoute = location.pathname.startsWith('/admin') ? '/admin' : '/employee';

  const menuItems = [
    { name: 'Overview', icon: <Home size={20} />, path: `${baseRoute}/dashboard` },
    { name: 'Profile', icon: <User size={20} />, path: `${baseRoute}/profile` },
    { name: 'Tasks', icon: <CheckSquare size={20} />, path: `${baseRoute}/tasks` },
    { name: 'Calendar', icon: <Calendar size={20} />, path: `${baseRoute}/calendar` },
    { name: 'Issues', icon: <AlertTriangle size={20} />, path: `${baseRoute}/issues` },
    { name: 'Settings', icon: <Settings size={20} />, path: `${baseRoute}/settings` },
  ];
  const handleLogout = async () => {
    await logout(); // clear token, user, etc.
    const userType = user?.role || 'employee'; // fallback to employee
    navigate(`/${userType}/login`);
  };
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} h-screen bg-gray-800 text-white transition-all duration-300 fixed left-0 top-0 shadow-2xl z-50`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900/50">
        {!collapsed && <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"><img src={img} className='ml-10 h-30 w-30 items-center justify-center rounded-xl'/></h2>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-700/50 transition-all transform hover:scale-105 active:scale-95"
        >
          {collapsed ? <ChevronRight size={20} className="text-gray-300 hover:text-white" /> : <ChevronLeft size={20} className="text-gray-300 hover:text-white" />}
        </button>
      </div>
      
      <div className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-5 ${
              location.pathname === item.path
                ? 'bg-blue-600/90 border-l-4 border-blue-400'
                : 'hover:bg-gray-700/50 border-l-4 border-transparent'
            } transition-all duration-200 transform hover:translate-x-1`}
          >
            <span className={`${
              location.pathname === item.path ? 'text-white' : 'text-gray-300'
            }`}>{item.icon}</span>
            {!collapsed && (
              <span className={`ml-4 ${
                location.pathname === item.path ? 'font-medium' : 'font-normal'
              }`}>{item.name}</span>
            )}
          </Link>
        ))}
      </div>
      
      <div className="absolute bottom-0 w-full border-t border-gray-700 bg-gray-900/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 hover:bg-gray-700/50 transition-all transform hover:translate-x-1"
        >
          <span className="text-gray-300 hover:text-red-400"><LogOut size={20} /></span>
          {!collapsed && <span className="ml-4 hover:text-red-400">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;