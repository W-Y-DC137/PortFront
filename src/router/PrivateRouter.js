// src/router/PrivateRouter.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
