import React, { useState } from 'react';
import './BudgetSetupPage.css';

const BudgetSetupPage = () => {
    const [budget, setBudget] = useState({ category: '', amount: '' });

    const handleChange = (event) => {
        setBudget({ ...budget, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Retrieve the JWT token
            const response = await fetch('http://localhost:5000/api/budget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(budget)
            });
    
            if (response.ok) {
                console.log('Budget added successfully');
                alert('Budget added successfully');
                setBudget({ category: '', amount: '' }); // Clear the form fields
            } else {
                console.error('Error adding budget');
                // Optionally, handle errors (like displaying a message to the user)
            }
        } catch (error) {
            console.error('Error during adding budget:', error);
        }
    };
    

    return (
        <div className="budget-setup">
            <h1>Set Up Your Budget</h1>
            <form onSubmit={handleSubmit} className="budget-form">
                <div>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={budget.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={budget.amount}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Budget</button>
            </form>
        </div>
    );
};

export default BudgetSetupPage;
