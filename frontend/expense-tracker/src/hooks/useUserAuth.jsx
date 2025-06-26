import { useContext, useEffect } from "react"; // <--- FIX 1: Add useEffect import
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";


export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // If user data already exists in context, no need to fetch again
        if (user) return;

        let isMounted = true; // To prevent state updates on unmounted components

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if (isMounted && response.data) {
                    updateUser(response.data); // Update user in context
                }
            } catch (error) {
                console.error("Failed to Fetch user info:", error);
                // If fetching fails (e.g., token expired or invalid)
                if (isMounted) {
                    clearUser(); // Clear user data from context and local storage
                    navigate("/login"); // Redirect to login page
                }
            }
        };

        fetchUserInfo(); // Call the async function

        // Cleanup function for useEffect
        return () => {
            isMounted = false; // Mark as unmounted to prevent memory leaks/errors
        };
        // FIX 2: Remove `Maps` from dependencies (it's stable)
        // FIX 3: Consider adding `user` to dependencies if you want the effect to re-run
        //        when 'user' becomes null (e.g., if a logout action happens elsewhere
        //        without a full component unmount/remount).
        //        For its current purpose (fetch if user is NOT present initially), it's
        //        often fine without 'user' here, but depends on exact use case.
    }, [updateUser, clearUser /*, user */]); // Keep updateUser and clearUser as they are context functions

};