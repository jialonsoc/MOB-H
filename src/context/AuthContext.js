import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            // Aquí iría tu lógica de autenticación con el backend
            const response = await fetch('TU_API/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.user) {
                setUser(data.user);
                await AsyncStorage.setItem('user', JSON.stringify(data.user));
                await AsyncStorage.setItem('token', data.token);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error en login:', error);
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch('TU_API/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (data.user) {
                setUser(data.user);
                await AsyncStorage.setItem('user', JSON.stringify(data.user));
                await AsyncStorage.setItem('token', data.token);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error en registro:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
            setUser(null);
        } catch (error) {
            console.error('Error en logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);