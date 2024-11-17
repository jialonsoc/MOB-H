// Tipos de hábitos disponibles
export const HABIT_TYPES = [
    { id: 'all', label: 'Todos' },
    { id: 'personal', label: 'Personal' },
    { id: 'trabajo', label: 'Trabajo' },
    { id: 'salud', label: 'Salud' },
    { id: 'otros', label: 'Otros' }
];

// Opciones de ordenamiento
export const SORT_OPTIONS = [
    { id: 'name', label: 'Nombre' },
    { id: 'count', label: 'Frecuencia' },
    { id: 'date', label: 'Fecha' }
];

// Temas de la aplicación
export const THEME = {
    LIGHT: {
        background: '#f5f5f5',
        card: '#ffffff',
        text: '#000000',
        textSecondary: '#666666',
        primary: '#007AFF',
        secondary: '#5856D6',
        border: '#e1e1e1',
        error: '#FF3B30',
        success: '#34C759'
    },
    DARK: {
        background: '#000000',
        card: '#1c1c1e',
        text: '#ffffff',
        textSecondary: '#999999',
        primary: '#0A84FF',
        secondary: '#5E5CE6',
        border: '#2c2c2e',
        error: '#FF453A',
        success: '#30D158'
    }
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
    LOAD_HABITS: 'Error al cargar los hábitos',
    SAVE_HABIT: 'Error al guardar el hábito',
    DELETE_HABIT: 'Error al eliminar el hábito',
    UPDATE_HABIT: 'Error al actualizar el hábito'
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
    DURATION: 200,
    SWIPE_THRESHOLD: -200
};

// Configuración de almacenamiento
export const STORAGE_KEYS = {
    HABITS: 'habits',
    THEME: 'theme',
    SETTINGS: 'settings'
};