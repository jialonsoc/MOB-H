import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            // Aquí iría la llamada al backend
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return true;
        } catch (error) {
            console.error('Error en registro:', error);
            return false;
        }
    };

    const login = async (email, password) => {
        try {
            // Aquí iría la llamada al backend
            const savedUser = await AsyncStorage.getItem('user');
            if (savedUser) {
                const userData = JSON.parse(savedUser);
                if (userData.email === email) {
                    setUser(userData);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Error en login:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Error en logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};