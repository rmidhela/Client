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
        if (!response.ok) {
            throw new Error('Error fetching expenses');
        }
        return data;
    } catch (error) {
        console.error('Error during fetching expenses:', error);
        throw error;
    }
};

export { fetchExpenses };
