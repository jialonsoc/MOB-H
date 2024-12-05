import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error al verificar usuario:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            // Aquí normalmente irían las validaciones con un backend
            // Por ahora, simulamos un login exitoso
            const userData = {
                id: Date.now().toString(),
                email,
                name: email.split('@')[0], // Usamos parte del email como nombre
                createdAt: new Date().toISOString(),
                trips: [],
                preferences: {
                    notifications: true,
                    language: 'es',
                    currency: 'USD'
                }
            };

            // Guardamos en AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return true;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    };

    const register = async (email, password, name) => {
        try {
            // Aquí normalmente irían las validaciones con un backend
            const userData = {
                id: Date.now().toString(),
                email,
                name,
                createdAt: new Date().toISOString(),
                trips: [],
                preferences: {
                    notifications: true,
                    language: 'es',
                    currency: 'USD'
                }
            };

            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return true;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Error en logout:', error);
            throw error;
        }
    };

    const updateUserProfile = async (updatedData) => {
        try {
            const newUserData = { ...user, ...updatedData };
            await AsyncStorage.setItem('user', JSON.stringify(newUserData));
            setUser(newUserData);
            return true;
        } catch (error) {
            console.error('Error actualizando perfil:', error);
            throw error;
        }
    };

    const updateUserPreferences = async (preferences) => {
        try {
            const newUserData = {
                ...user,
                preferences: { ...user.preferences, ...preferences }
            };
            await AsyncStorage.setItem('user', JSON.stringify(newUserData));
            setUser(newUserData);
            return true;
        } catch (error) {
            console.error('Error actualizando preferencias:', error);
            throw error;
        }
    };

    const addTripToUser = async (tripId) => {
        try {
            const newUserData = {
                ...user,
                trips: [...user.trips, tripId]
            };
            await AsyncStorage.setItem('user', JSON.stringify(newUserData));
            setUser(newUserData);
            return true;
        } catch (error) {
            console.error('Error añadiendo viaje al usuario:', error);
            throw error;
        }
    };

    const removeTripFromUser = async (tripId) => {
        try {
            const newUserData = {
                ...user,
                trips: user.trips.filter(id => id !== tripId)
            };
            await AsyncStorage.setItem('user', JSON.stringify(newUserData));
            setUser(newUserData);
            return true;
        } catch (error) {
            console.error('Error eliminando viaje del usuario:', error);
            throw error;
        }
    };

    if (loading) {
        return null; // O un componente de carga
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            login,
            logout,
            register,
            updateUserProfile,
            updateUserPreferences,
            addTripToUser,
            removeTripFromUser,
            isAuthenticated: !!user 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}