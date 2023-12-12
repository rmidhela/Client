import { fetchExpenses } from '../ExpenseService'; // Adjust the path as needed
import React, { useState, useEffect } from 'react';
import Chart from "react-google-charts";

const ExpenseChart = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const data = await fetchExpenses();
                setExpenses(data);
            } catch (error) {
                console.error('Failed to load expenses:', error);
            }
        };

        loadExpenses();
    }, []);

    const chartData = [
        ['Expense Category', 'Amount'],
        ...expenses.map(expense => [expense.description, expense.amount]),
    ];

    const options = {
        title: 'Expenses',
        is3D: true,
    };

    return (
        <div>
            <Chart
                chartType="PieChart"
                data={chartData}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
};

export default ExpenseChart;
