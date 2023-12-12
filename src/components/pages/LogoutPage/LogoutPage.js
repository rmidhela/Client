import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout logic here
        // For example, clear the user token from localStorage
        localStorage.removeItem('token');

        // Optionally, add any other cleanup or state reset logic here

        // Redirect to the login or home page after logout
        navigate('/login');
    }, [navigate]);

    const handleLogin = () => {
        // Navigation to login page 
        navigate('/login');
    }

    return (
        <div>
            <h1>Thank you for visiting. See you again!</h1>
            <p>Would you like to log in again?</p>
            <button type='button' className='login-button' onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default LogoutPage;
