import React, { useState, useEffect } from 'react';
import './ExpenseEntryPage.css';

const ExpenseEntryPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ description: '', amount: '' });

    // Function to fetch expenses from the server
    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/expenses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            const data = await response.json();
            if (response.ok) {
                setExpenses(data);
            } else {
                console.error('Error fetching expenses:', data.message);
            }
        } catch (error) {
            console.error('Error during fetching expenses:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleAddExpense = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(newExpense)
            });

            const data = await response.json();
            if (response.ok) {
                setExpenses([...expenses, data.expense]);
                setNewExpense({ description: '', amount: '' }); // Reset the form
            } else {
                console.error('Error adding expense:', data.message);
            }
        } catch (error) {
            console.error('Error during adding expense:', error);
        }
    };
    const handleDeleteExpense = async (expenseId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.ok) {
                setExpenses(expenses.filter((expense) => expense._id !== expenseId));
            } else {
                console.error('Error deleting expense');
            }
        } catch (error) {
            console.error('Error during deleting expense:', error);
        }
    };

    const handleChange = (event) => {
        setNewExpense({ ...newExpense, [event.target.name]: event.target.value });
    };

    return (
        <div className="expense-page">
            <h1>Enter Your Expenses</h1>
            <form onSubmit={handleAddExpense} className="expense-form">
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={newExpense.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={newExpense.amount}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Expense</button>
            </form>
            <ul className="expense-list">
                {expenses.map(expense => (
                    <li key={expense._id}>
                        {expense.description}: ${expense.amount}
                        <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseEntryPage;
