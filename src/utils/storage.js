import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
    USER: 'user',
    TRIPS: 'trips',
    EXPENSES: 'expenses',
    CHAT_MESSAGES: 'chat_messages',
    THEME: 'theme',
};

export const storage = {
    save: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error('Error guardando datos:', error);
            throw error;
        }
    },

    load: async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Error cargando datos:', error);
            throw error;
        }
    },

    remove: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error eliminando datos:', error);
            throw error;
        }
    },

    // Método específico para viajes
    saveTrip: async (trip) => {
        try {
            const trips = await storage.load('trips') || [];
            const updatedTrips = [...trips, trip];
            await storage.save('trips', updatedTrips);
            return updatedTrips;
        } catch (error) {
            console.error('Error guardando viaje:', error);
            throw error;
        }
    },

    // Método para actualizar un viaje específico
    updateTrip: async (updatedTrip) => {
        try {
            const trips = await storage.load('trips') || [];
            const updatedTrips = trips.map(trip => 
                trip.id === updatedTrip.id ? updatedTrip : trip
            );
            await storage.save('trips', updatedTrips);
            return updatedTrips;
        } catch (error) {
            console.error('Error actualizando viaje:', error);
            throw error;
        }
    }
};