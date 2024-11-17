import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadHabits();
    }, []);

    const loadHabits = async () => {
        try {
            setLoading(true);
            const savedHabits = await AsyncStorage.getItem('habits');
            if (savedHabits) {
                setHabits(JSON.parse(savedHabits));
            }
        } catch (error) {
            setError('Error al cargar los hábitos');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addHabit = async (habitName) => {
        try {
            const newHabit = {
                id: Date.now().toString(),
                name: habitName,
                count: 0,
                createdAt: new Date().toISOString(),
                type: 'personal'
            };
            
            const updatedHabits = [...habits, newHabit];
            setHabits(updatedHabits);
            await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
            return true;
        } catch (error) {
            setError('Error al añadir el hábito');
            return false;
        }
    };

    const deleteHabit = async (habitId) => {
        try {
            const updatedHabits = habits.filter(habit => habit.id !== habitId);
            setHabits(updatedHabits);
            await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
            return true;
        } catch (error) {
            setError('Error al eliminar el hábito');
            return false;
        }
    };

    const updateHabitCount = async (habitId) => {
        try {
            const updatedHabits = habits.map(habit =>
                habit.id === habitId
                    ? { ...habit, count: (habit.count || 0) + 1 }
                    : habit
            );
            setHabits(updatedHabits);
            await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
            return true;
        } catch (error) {
            setError('Error al actualizar el hábito');
            return false;
        }
    };

    return {
        habits,
        loading,
        error,
        addHabit,
        deleteHabit,
        updateHabitCount,
        refreshHabits: loadHabits
    };
};