
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>


  if (!user) return <Navigate to={`/${role}/login`} />

  
  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} />
  }

  return children
}

export default PrivateRoute
