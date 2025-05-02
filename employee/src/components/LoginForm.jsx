import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from "../Context/AuthContext"
const LoginForm = ({ userType }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await login(formData, userType);
        if (result.success) {
            toast.success('Logged in successfully!');
            navigate(`/${userType}/dashboard`);
        } else {
            toast.error(result.message || 'Internal Server Error');

        }

    }
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-6">

            <div className="mb-4">
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-orange-500"
                    required
                />
            </div>

            <div className="mb-6">
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-orange-500"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-black hover:to-gray-800 text-white rounded-md font-medium transition-colors duration-300 focus:outline-none"
            >
                Sign in
            </button>

            {/* <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div> */}

            {/* <GoogleAuthButton 
        text="Sign in with Google" 
        onSuccess={handleGoogleSuccess} 
      /> */}

            <div className="mt-6 text-center">
                <p className="text-gray-700">
                    Don't have an account?{' '}
                    <Link to={`/${userType}/signup`} className="text-orange-500 font-medium hover:underline hover:text-black">
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default LoginForm