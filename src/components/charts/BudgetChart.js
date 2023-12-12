import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { fetchBudgets } from '../budgetService';

const BudgetChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getBudgetData = async () => {
            try {
                const budgets = await fetchBudgets();
                const data = [['Category', 'Amount']];
                budgets.forEach(budget => {
                    data.push([budget.category, budget.amount]);
                });
                setChartData(data);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };

        getBudgetData();
    }, []);

    return (
        <div style={{ textAlign: 'center' }}> {/* Center align the chart container */}
            {chartData.length > 1 ? (
                <Chart
                    width={"100%"}
                    height={"400px"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={chartData}
                    options={{
                        title: 'Budget Distribution',
                        titleTextStyle: { color: 'black', fontSize: 20 }, // Inline CSS for title
                        pieHole: 0.4,
                    }}
                />
            ) : (
                <p>Loading budget data...</p>
            )}
        </div>
    );
};

export default BudgetChart;
