// import React, { useState, useContext } from 'react'; // Removed isValidElement
// import AuthLayout from '../../components/layouts/AuthLayout';
// import { useNavigate, Link } from 'react-router-dom';
// import Input from '../../components/inputs/Input';
// import { validateEmail } from '../../utils/helper'; // Assuming validateEmail is here
// import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATHS } from '../../utils/apiPaths';
// import { UserContext } from '../../context/UserContext';
// import uploadImage from '../../utils/uploadImage'; // Correctly imported uploadImage function

// const SignUp = () => {
//     const [profilePic, setProfilePic] = useState(null);
//     const [fullName, setFullName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false); // Added loading state

//     const navigate = useNavigate();
//     const { updateUser } = useContext(UserContext);

//     const handleSignUp = async (e) => {
//         e.preventDefault();

//         // Client-side validation
//         if (!fullName) {
//             setError("Please enter your full name.");
//             return;
//         }
//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }
//         if (!password) {
//             setError("Please enter a password.");
//             return;
//         }
//         // You might want to add more robust password validation here (e.g., min length, complexity)

//         setError(""); // Clear previous errors
//         setIsLoading(true); // Set loading to true

//         let profileImageUrl = "";

//         try {
//             // Upload image if present
//             if (profilePic) {
//                 try {
//                     const imgUploadRes = await uploadImage(profilePic);
//                     // Use optional chaining for safer access
//                     profileImageUrl = imgUploadRes?.data?.url || "";
//                 } catch (uploadError) {
//                     console.error("Profile picture upload failed:", uploadError);
//                     setError("Failed to upload profile picture. Please try again.");
//                     setIsLoading(false); // Stop loading if image upload fails
//                     return; // Stop the sign-up process
//                 }
//             }

//             // Call the sign-up API
//             const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
//                 fullName,
//                 email,
//                 password,
//                 profileImageUrl
//             });

//             const { token, user } = response.data;

//             if (token) {
//                 localStorage.setItem('token', token); // Store token
//                 updateUser(user); // Update user context
//                 navigate('/dashboard'); // Redirect to dashboard
//             }
//         } catch (err) {
//             // Handle API errors
//             if (err.response && err.response.data.message) {
//                 setError(err.response.data.message);
//             } else {
//                 setError("An unexpected error occurred during sign-up. Please try again later.");
//             }
//         } finally {
//             setIsLoading(false); // Always set loading to false
//         }
//     };

//     return (
//         <AuthLayout>
//             <div className='flex flex-col flex-grow my-auto mt-4'>
//                 <h3 className='text-xl font-semibold text-black'>Create An Account</h3>
//                 <p className='text-xs text-slate-700 mt-[5px] mb-6'>
//                     Join us today by entering your details below.
//                 </p>

//                 <form onSubmit={handleSignUp} className="w-full">
//                     <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
//                     <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                         <Input
//                             value={fullName}
//                             onChange={({ target }) => setFullName(target.value)}
//                             label="Full Name"
//                             placeholder='John Doe'
//                             type='text'
//                         />
//                         <Input
//                             value={email}
//                             onChange={({ target }) => setEmail(target.value)}
//                             label="Email address"
//                             placeholder='john@example.com'
//                             type='text'
//                         />
//                         <div className='col-span-1'>
//                             <Input
//                                 value={password}
//                                 onChange={({ target }) => setPassword(target.value)}
//                                 label="Password"
//                                 placeholder='Min 8 Characters'
//                                 type='password'
//                             />
//                         </div>
//                     </div>

//                     {error && (
//                         <div className="text-red-500 text-xs mt-2">{error}</div>
//                     )}

//                     <button type="submit" className="btn-primary mt-6" disabled={isLoading}>
//                         {isLoading ? 'SIGNING UP...' : 'Sign Up'}
//                     </button>

//                     <p className="text-xs text-center mt-4 text-slate-700">
//                         Already have an account?{" "}
//                         <Link to="/login" className="text-violet-600 font-semibold hover:underline">
//                             Login
//                         </Link>
//                     </p>
//                 </form>
//             </div>
//         </AuthLayout>
//     );
// };

// export default SignUp;
import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null); // This holds the File object
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!fullName) {
            setError("Please enter your full name.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter a password.");
            return;
        }

        setError("");
        setIsLoading(true);

        let finalProfileImageUrl = ""; // Changed variable name for clarity

        try {
            // Upload image if present
            if (profilePic) {
                try {
                    console.log("Frontend: Uploading profile picture...");
                    const imgUploadRes = await uploadImage(profilePic); // This returns { imageUrl: "..." }
                    // FIX 1: Correctly extract the imageUrl from the upload response
                    finalProfileImageUrl = imgUploadRes?.imageUrl || "";
                    console.log("Frontend: Profile picture uploaded. Received URL:", finalProfileImageUrl);
                } catch (uploadError) {
                    console.error("Profile picture upload failed:", uploadError);
                    setError("Failed to upload profile picture. Please try again.");
                    setIsLoading(false);
                    return;
                }
            }

            // Call the sign-up API, sending the obtained profileImageUrl
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl: finalProfileImageUrl // Send the correct URL to the backend
            });

            const { token, user } = response.data; // `user` from backend's register response

            if (token) {
                localStorage.setItem('token', token);

                // FIX 2: Create a NEW user object that combines the user data from
                //        the register response with the CORRECT profileImageUrl
                const userWithProfileImage = {
                    ...user, // Spread existing user data from register response
                    profileImageUrl: finalProfileImageUrl // Override/add with the correct URL
                };

                console.log("Frontend: Updating UserContext with:", userWithProfileImage);
                updateUser(userWithProfileImage); // Update user context with the complete object
                navigate('/dashboard');
            } else {
                // This 'else' block helps in debugging if token is missing but no error
                console.warn("Sign-up successful but no token received in response data.");
                setError("Sign-up successful, but session could not be established. Please try again.");
            }
        } catch (err) {
            // Handle API errors
            console.error("Sign-up Error:", err);
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred during sign-up. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className='flex flex-col flex-grow my-auto mt-4'>
                <h3 className='text-xl font-semibold text-black'>Create An Account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp} className="w-full">
                    {/* Assuming ProfilePhotoSelector correctly sets profilePic state with a File object */}
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Full Name"
                            placeholder='John Doe'
                            type='text'
                        />
                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email address"
                            placeholder='john@example.com'
                            type='text'
                        />
                        <div className='col-span-1'>
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder='Min 8 Characters'
                                type='password'
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-xs mt-2">{error}</div>
                    )}

                    <button type="submit" className="btn-primary mt-6" disabled={isLoading}>
                        {isLoading ? 'SIGNING UP...' : 'Sign Up'}
                    </button>

                    <p className="text-xs text-center mt-4 text-slate-700">
                        Already have an account?{" "}
                        <Link to="/login" className="text-violet-600 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;