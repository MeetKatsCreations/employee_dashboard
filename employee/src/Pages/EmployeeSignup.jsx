import SignupForm from '../components/SignupForm'
import ToggleButton from '../components/ToggleButton'
import logo from '../assets/logo.jpg'

const EmployeeSignup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Company Logo"
            className="w-16 h-16 rounded-2xl mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-black">
            Employee Signup
          </h1>
        </div>
        
        <div className="flex justify-center mt-4 mb-6">
          <ToggleButton mode="employee" isLoginPage={false} />
        </div>
        
        <SignupForm userType="employee" />
      </div>
    </div>
  )
}

export default EmployeeSignup