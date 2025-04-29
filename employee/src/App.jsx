import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EmployeeLogin from './pages/EmployeeLogin'
import EmployeeSignup from './pages/EmployeeSignup'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import EmployeeDashboard from './Pages/EmployeeDashboard'
import AdminDashboard from './Pages/AdminDashboard'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { user,loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <>
    <Router>
      <Routes>
      <Route
          path="/"
          element={
            user ? (
              user.role === 'admin' ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/employee/dashboard" />
              )
            ) : (
              <Navigate to="/employee/login" />
            )
          }
        />        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/signup" element={<EmployeeSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route
          path="/employee/dashboard"
          element={
            <PrivateRoute role="employee">
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App