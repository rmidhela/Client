import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Importing CSS

const SignupPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setErrorMessage(''); // Reset error message on input change
    };

    const validateForm = () => {
        // Add your validation logic here
        if (!userData.username || !userData.email || !userData.password) {
            setErrorMessage('All fields are required.');
            return false;
        }
        // Add other validation checks as needed
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/register', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setErrorMessage(data.message || 'Error occurred during signup');
            } else {
                console.log('Signup successful:', data);
                navigate('/login'); // Redirect to login page after successful signup
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setErrorMessage('Error occurred during signup');
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <input 
                    type="text" 
                    name="username" 
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username" 
                    className="signup-input" 
                />
                <input 
                    type="email" 
                    name="email" 
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email" 
                    className="signup-input" 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password" 
                    className="signup-input" 
                />
                <button type="submit" className="signup-button">Sign Up</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default SignupPage;
