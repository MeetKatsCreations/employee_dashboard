import { useNavigate } from 'react-router-dom'

const ToggleButton = ({ mode, isLoginPage }) => {
  const navigate = useNavigate()
  
  const toggleMode = () => {
    if (mode === 'employee') {
      navigate(isLoginPage ? '/admin/login' : '/admin/signup')
    } else {
      navigate(isLoginPage ? '/employee/login' : '/employee/signup')
    }
  }

  return (
    <button 
  onClick={toggleMode} 
  className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-black hover:to-gray-800 text-white rounded-md transition-colors duration-300 focus:outline-none"
>
  Switch to {mode === 'employee' ? 'Admin' : 'Employee'} Mode
</button>


  )
}

export default ToggleButton