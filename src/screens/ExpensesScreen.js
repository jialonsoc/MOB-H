import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

export default function ExpensesScreen({ navigation }) {
    const { isDarkMode } = useThemeContext();
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [expenses, setExpenses] = useState([]);

    const handleAddExpense = (expense) => {
        setExpenses([...expenses, { ...expense, id: Date.now().toString() }]);
        setShowForm(false);
    };

    return (
        <View style={[
            styles.container,
            { backgroundColor: isDarkMode ? '#000' : '#fff' }
        ]}>
            <View style={styles.header}>
                <Text style={[
                    styles.title,
                    { color: isDarkMode ? '#fff' : '#000' }
                ]}>
                    Gastos Compartidos
                </Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowForm(true)}
                >
                    <Ionicons 
                        name="add-circle" 
                        size={30} 
                        color="#007AFF" 
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {showForm ? (
                    <ExpenseForm 
                        onSubmit={handleAddExpense}
                        onCancel={() => setShowForm(false)}
                        isDarkMode={isDarkMode}
                    />
                ) : (
                    <ExpenseList 
                        expenses={expenses}
                        currentUserId={user?.id}
                        isDarkMode={isDarkMode}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    addButton: {
        padding: 5,
    },
    content: {
        flex: 1,
    },
});