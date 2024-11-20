import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.token) {
                await AsyncStorage.setItem('token', response.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.token) {
                await AsyncStorage.setItem('token', response.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
        } catch (error) {
            console.error('Error en logout:', error);
            throw error;
        }
    },
};