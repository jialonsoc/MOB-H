const BASE_URL = 'TU_API_URL';

export const api = {
    get: async (endpoint) => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    post: async (endpoint, data) => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    upload: async (endpoint, formData) => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        return response.json();
    },
};