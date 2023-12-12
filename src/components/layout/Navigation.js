import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust the path as necessary

const Navigation = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth(); // Assuming useAuth returns an object with isLoggedIn

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav role='navigation' aria-label='Main-menu' itemScope itemType='https://schema.org/SiteNavigationElement'>
            <ul>
                <li><Link itemProp='url' to="/">Home</Link></li>
                {isLoggedIn && <li><Link itemProp='url' to="/dashboard">Dashboard</Link></li>}
                {isLoggedIn && <li><Link itemProp='url' to="/expense-entry">Expenses</Link></li>}
                {isLoggedIn && <li><Link itemProp='url' to="/budget-setup">Set the Budget</Link></li>}
                {!isLoggedIn && <li><Link itemProp='url' to="/login">Log In</Link></li>}
                {!isLoggedIn && <li><Link itemProp='url' to="/signup">Sign Up</Link></li>}
                {isLoggedIn && <li><button onClick={handleLogout} className="logout-button">Log Out</button></li>}
            </ul>
        </nav>
    );
};

export default Navigation;
