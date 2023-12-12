// Add useEffect and useState imports
import React, { useEffect, useState } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/userdata', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            {userData && <p>Welcome, {userData.username}</p>}
            {/* Rest of your dashboard content */}
        </div>
    );
};

export default DashboardPage;
