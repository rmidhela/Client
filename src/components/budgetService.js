const fetchBudgets = async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token
        const response = await fetch('http://localhost:5000/api/budget', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error('Error fetching budgets');
        }
        return data;
    } catch (error) {
        console.error('Error during fetching budgets:', error);
        throw error;
    }
};

export { fetchBudgets };
