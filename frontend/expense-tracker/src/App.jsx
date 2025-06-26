import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';
import Home from './pages/Dashboard/Home';
import Login from './pages/auth/login';
import SignUp from './pages/auth/SignUp';
import { UserProvider, UserContext } from './context/UserContext'; // <--- Import UserProvider as named export too
import { Toaster } from 'react-hot-toast';




const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontsSize: '13px',
          },
        }}
      />
    </UserProvider>
  );
};

export default App;
