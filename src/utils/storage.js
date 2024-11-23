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
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    },

    load: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    },

    remove: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing data:', error);
        }
    },

    clear: async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    }
};