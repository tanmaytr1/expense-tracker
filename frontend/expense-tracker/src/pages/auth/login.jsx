import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
// import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector' // This is not needed in Login.js
import { API_PATHS } from '../../utils/apiPaths'; // Path to API path definitions
import axiosInstance from '../../utils/axiosInstance'; // Path to custom Axios instance
import { UserContext } from '../../context/UserContext'; // Import UserContext

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // ... (validation code) ...
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });

            // // --- ADD THIS CONSOLE LOG HERE ---
            // console.log("Login API Response Data:", response.data);
            // // --- END ADDITION ---

            const { token, user } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate('/dashboard');
            } else {
                // This 'else' block helps in debugging if token is missing but no error
                console.warn("Login successful but no token received in response data.");
                setError("Login successful, but session could not be established. Please try again.");
            }
        } catch (err) {
            // Handle API errors
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
                console.error("Login Error (Backend Message):", err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
                console.error("Login Error (Unexpected):", err);
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in</p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email address" // Changed to match common phrasing
                        placeholder='john@example.com'
                        type='text'
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder='Min 8 Characters'
                        type='password'
                    />

                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                    {/* Button with loading state */}
                    <button
                        type='submit'
                        className='btn-primary'
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? 'LOGGING IN...' : 'LOGIN'} {/* Change text when loading */}
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Don't have an account?{" "}
                        <Link className='font-medium text-violet-500 underline' to='/signup'>
                            SignUp
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login;