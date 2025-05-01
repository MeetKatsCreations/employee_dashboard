import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  ClipboardCheck,
  LogOut,
  Users 
} from 'lucide-react';
import img from '../assets/logo.jpg';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const baseRoute = location.pathname.startsWith('/admin') ? '/admin' : '/employee';

  const menuItems = [
    { name: 'Overview', icon: <Home size={20} />, path: `${baseRoute}/dashboard` },
    ...(baseRoute === '/admin'
      ? [{ name: 'Employees', icon: <Users size={20} />, path: `${baseRoute}/employees` }]
      : []),
    { name: 'Tasks', icon: <ClipboardCheck size={20} />, path: `${baseRoute}/tasks` },
    { name: 'Logs', icon: <CheckSquare size={20} />, path: `${baseRoute}/logs` },
    { name: 'Calendar', icon: <Calendar size={20} />, path: `${baseRoute}/calendar` },
    { name: 'Issues', icon: <AlertTriangle size={20} />, path: `${baseRoute}/issues` },
    { name: 'Profile', icon: <User size={20} />, path: `${baseRoute}/profile` },
    { name: 'Settings', icon: <Settings size={20} />, path: `${baseRoute}/settings` }
   
  ];

  const handleLogout = async () => {
    await logout();
    const userType = user?.role || 'employee';
    navigate(`/${userType}/login`);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} h-screen bg-white text-orange-600 transition-all duration-300 fixed left-0 top-0 shadow-2xl z-50`}>
      <div className="flex justify-between items-center p-4 border-b border-orange-100">
        {!collapsed && (
          <div className="flex items-center justify-center">
            <img src={img} className='ml-4 h-10 w-10 rounded-full' alt="Logo" />
            <span className="ml-2 text-xl font-bold text-orange-600">MeetKats</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-orange-100 transition-all transform hover:scale-105 active:scale-95"
        >
          {collapsed ? <ChevronRight size={20} className="text-orange-500" /> : <ChevronLeft size={20} className="text-orange-500" />}
        </button>
      </div>

      <div className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-4 ${
              location.pathname === item.path
                ? 'bg-orange-100 border-l-4 border-orange-500'
                : 'hover:bg-orange-50 border-l-4 border-transparent'
            } transition-all duration-200 transform hover:translate-x-1`}
          >
            <span className={`${location.pathname === item.path ? 'text-orange-600' : 'text-gray-500'}`}>
              {item.icon}
            </span>
            {!collapsed && (
              <span className={`ml-4 ${
                location.pathname === item.path ? 'font-semibold text-orange-600' : 'text-gray-700'
              }`}>
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="absolute bottom-0 w-full border-t border-orange-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 hover:bg-orange-50 transition-all transform hover:translate-x-1"
        >
          <span className="text-gray-500 hover:text-red-500"><LogOut size={20} /></span>
          {!collapsed && <span className="ml-4 text-gray-600 hover:text-red-500">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
