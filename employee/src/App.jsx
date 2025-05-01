import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EmployeeLogin from './pages/EmployeeLogin'
import EmployeeSignup from './pages/EmployeeSignup'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import EmployeeDashboard from './Pages/EmployeeDashboard'
import AdminDashboard from './Pages/AdminDashboard'
import PrivateRoute from './components/PrivateRoute'
import Sidebar from './components/Sidebar';
import Profile from './Pages/Profile';
import Tasks from './Pages/Tasks';
import Calendar from './Pages/Calendar';
import Settings from './Pages/Settings';
import Issues from './Pages/Issues';
import DashboardLayout from './components/DashboardLayout.jsx';
import { useAuth } from './Context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RedirectToDashboard from './components/RedirectToDashboard.jsx'
import EmployeeTaskAssignment from './Pages/EmployeeTaskAssignment.jsx'
import AdminTaskAssignment from './Pages/AdminTaskAssignment.jsx'
import Employees from './Pages/Employees.jsx'
function App() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<RedirectToDashboard />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/signup" element={<EmployeeSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route
            path="/employee"
            element={
              <PrivateRoute role="employee">
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="logs" element={<Tasks />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="issues" element={<Issues />} />
            <Route path="tasks" element={<EmployeeTaskAssignment />} />
          </Route>

          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="logs" element={<Tasks />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="issues" element={<Issues />} />
            <Route path="tasks" element={<AdminTaskAssignment />} />
            <Route path="employees" element={<Employees/>} />


          </Route>

        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App