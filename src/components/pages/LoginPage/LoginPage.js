import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useAuth } from '../../../contexts/AuthContext'; // Adjust the path as necessary


const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();


    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
        setErrorMessage(''); // Reset error message on input change
    };

    const validateForm = () => {
        if (!credentials.username || !credentials.password) {
            setErrorMessage('Both username and password are required.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            if (!response.ok) {
                setErrorMessage(data.message || 'Login error occurred');
            } else {
                console.log('Login successful:', data);
                login(data.token); // Update the login state
                navigate('/dashboard'); // Redirect to dashboard
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Error occurred during login');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username"
                        value={credentials.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        value={credentials.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit" className="login-button">Log In</button>
                <button type="button" className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
