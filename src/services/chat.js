import { api } from './api';

export const chatService = {
    getMessages: async () => {
        try {
            return await api.get('/chat/messages');
        } catch (error) {
            console.error('Error obteniendo mensajes:', error);
            throw error;
        }
    },

    sendMessage: async (messageData) => {
        try {
            return await api.upload('/chat/messages', messageData);
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            throw error;
        }
    },

    getMentionableUsers: async (query) => {
        try {
            return await api.get(`/users/search?q=${query}`);
        } catch (error) {
            console.error('Error buscando usuarios:', error);
            throw error;
        }
    },
};