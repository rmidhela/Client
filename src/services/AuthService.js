const port = 3010;

const API_URL = 'http://localhost:${port}';

const login = async (username, password) => {
    // Implementing login logic
    try{
        const response = await fetch(`${API_URL}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if(!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const register = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const refreshToken = async (token) => {
    try {
        const response = await fetch(`${API_URL}/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        throw error;
    }
};


export const authService = {
    login,
    logout,
    register,
    refreshToken
};
