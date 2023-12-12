import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isLoggedIn } = useAuth();

    // If the user is logged in, render the component passed to PrivateRoute
    // Otherwise, redirect to the login page
    return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
