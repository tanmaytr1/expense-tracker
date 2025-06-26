// frontend/expense-tracker/src/context/UserContext.js

import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext(null); // Keep as named export

// Change this:
// const UserProvider = ({ children }) => { ... };
// export default UserProvider;

// TO THIS:
export const UserProvider = ({ children }) => { // <--- Export UserProvider as a named export
    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchUserInfo = async () => {
                try {
                    const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user info:", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            };
            fetchUserInfo();
        }
    }, []);

    const contextValue = { user, updateUser, clearUser };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

// Remove 'export default UserProvider;' from the end of the file.