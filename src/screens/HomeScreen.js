import { useState, useEffect } from 'react';
import { 
    View, 
    SafeAreaView, 
    StyleSheet,
    Platform,
    StatusBar,
    Alert,
    Keyboard 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import HabitCard from '../components/HabitCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import AddHabitInput from '../components/AddHabitInput';
import { useThemeContext } from '../context/ThemeContext';

export default function HomeScreen() {
    const { isDarkMode } = useThemeContext();
    const [habits, setHabits] = useState([]);
    const [newHabitName, setNewHabitName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadHabits();
        }
    }, [isFocused]);

    const loadHabits = async () => {
        try {
            const savedHabits = await AsyncStorage.getItem('habits');
            if (savedHabits) {
                setHabits(JSON.parse(savedHabits));
            }
        } catch (error) {
            console.error('Error loading habits:', error);
        }
    };

    const addHabit = async () => {
        if (newHabitName.trim()) {
            const newHabit = {
                id: Date.now().toString(),
                name: newHabitName.trim(),
                type: 'personal',
                count: 0,
                createdAt: new Date().toISOString(),
            };

            const updatedHabits = [...habits, newHabit];
            setHabits(updatedHabits);
            await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
            setNewHabitName('');
            Keyboard.dismiss();
        } else {
            Alert.alert('Error', 'Por favor ingresa un nombre para el hábito');
        }
    };

    const deleteHabit = async (habitId) => {
        const updatedHabits = habits.filter(habit => habit.id !== habitId);
        setHabits(updatedHabits);
        await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
    };

    const incrementHabitCount = async (habitId) => {
        const updatedHabits = habits.map(habit => 
            habit.id === habitId 
                ? { ...habit, count: (habit.count || 0) + 1 }
                : habit
        );
        setHabits(updatedHabits);
        await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
    };

    const filteredHabits = habits.filter(habit => {
        const matchesSearch = habit.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || habit.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <SafeAreaView style={[styles.container, { 
            backgroundColor: isDarkMode ? '#000' : '#fff' 
        }]}>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Buscar hábito..."
            />
            
            <FilterBar
                selectedFilter={filterType}
                onFilterChange={setFilterType}
            />
            
            <AddHabitInput
                value={newHabitName}
                onChangeText={setNewHabitName}
                onSubmit={addHabit}
            />

            <View style={styles.habitList}>
                {filteredHabits.map(habit => (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        onDelete={deleteHabit}
                        onIncrement={incrementHabitCount}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f5f5f5',
    },
    habitList: {
        flex: 1,
        padding: 16,
    }
});