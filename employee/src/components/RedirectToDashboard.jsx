
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const RedirectToDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/employee/login" />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }

  if (user.role === 'employee') {
    return <Navigate to="/employee/dashboard" />;
  }

  return <Navigate to="/employee/login" />;
};

export default RedirectToDashboard;
