import React from 'react';
import './DashboardPage.css';
import ExpenseChart from '../../charts/ExpenseChart';
import BudgetChart from '../../charts/BudgetChart';

const DashboardPage = () => {

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            <ExpenseChart />
            <BudgetChart />
        </div>
    );
};

export default DashboardPage;