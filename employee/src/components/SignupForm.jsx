import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../Context/AuthContext"
import { toast } from 'react-toastify'

const SignupForm = ({ userType }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })
    const { register } = useAuth();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Signup data:', formData)
        const result = await register(formData, userType); 
        if (result.success) {
             toast.success('Registered successfully!')
            navigate(`/${userType}/login`);
        } else {
            toast.error(result.message || 'Registration failed. Please try again.')

        }
        
    }



    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-6">
           
            <div className="mb-4">
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-orange-500"
                    required
                />
            </div>

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
            <div className="mb-6">
                <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Confirm Password"
                    value={formData.cpassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-orange-500"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-black hover:to-gray-800 text-white rounded-md font-medium transition-colors duration-300 focus:outline-none"
            >
                Sign up
            </button>


            <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* <GoogleAuthButton
        text="Sign up with Google"
        onSuccess={handleGoogleSuccess}
      /> */}

            <div className="mt-6 text-center">
                <p className="text-gray-700">
                    Already have an account?{' '}
                    <Link to={`/${userType}/login`} className="text-orange-500 font-medium hover:underline hover:text-black">
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default SignupForm