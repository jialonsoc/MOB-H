import { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    SafeAreaView, 
    StyleSheet,
    Platform,
    StatusBar,
    Alert,
    Keyboard,
    ScrollView,
    RefreshControl
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
    const [refreshing, setRefreshing] = useState(false);

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

    const addHabit = async (habitName, category, image) => {
        if (habitName.trim()) {
            const newHabit = {
                id: Date.now().toString(),
                name: habitName.trim(),
                type: category,
                count: 0,
                image: image,
                createdAt: new Date().toISOString(),
            };

            const updatedHabits = [...habits, newHabit];
            setHabits(updatedHabits);
            await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
            setNewHabitName('');
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
        if (filterType === 'all') return true;
        return habit.type === filterType;
    });

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadHabits();
        setRefreshing(false);
    }, []);

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

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.habitList}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={isDarkMode ? '#fff' : '#000'}
                    />
                }
            >
                {filteredHabits.map(habit => (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        onDelete={deleteHabit}
                        onIncrement={incrementHabitCount}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    habitList: {
        padding: 16,
        paddingTop: 8,
    }
});