import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExpenseList from '../components/ExpenseList';
import TripChat from '../components/TripChat';
import { useThemeContext } from '../context/ThemeContext';
import { storage } from '../utils/storage';

const Tab = createMaterialTopTabNavigator();

function ExpensesTab({ trip, onUpdateTrip, isDarkMode }) {
    return (
        <View style={styles.tabContainer}>
            <ExpenseList
                expenses={trip.expenses}
                tripId={trip.id}
                onUpdateExpenses={(newExpenses) => {
                    onUpdateTrip({ ...trip, expenses: newExpenses });
                }}
                isDarkMode={isDarkMode}
            />
        </View>
    );
}

function ChatTab({ trip, onUpdateTrip, isDarkMode }) {
    const handleSendMessage = async (message) => {
        const updatedTrip = {
            ...trip,
            messages: [...(trip.messages || []), message],
        };
        await onUpdateTrip(updatedTrip);
    };

    return (
        <View style={styles.tabContainer}>
            <TripChat
                tripId={trip.id}
                messages={trip.messages || []}
                onSendMessage={handleSendMessage}
                isDarkMode={isDarkMode}
            />
        </View>
    );
}

export default function TripDetailsScreen({ route, navigation }) {
    const { trip: initialTrip } = route.params;
    const [trip, setTrip] = useState(initialTrip);
    const { isDarkMode } = useThemeContext();

    const handleUpdateTrip = async (updatedTrip) => {
        try {
            const trips = await storage.load('trips');
            const updatedTrips = trips.map(t => 
                t.id === updatedTrip.id ? updatedTrip : t
            );
            await storage.save('trips', updatedTrips);
            setTrip(updatedTrip);
        } catch (error) {
            console.error('Error updating trip:', error);
        }
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
                    {trip.name}
                </Text>
            </View>

            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { 
                        backgroundColor: isDarkMode ? '#222' : '#fff'
                    },
                    tabBarLabelStyle: {
                        fontFamily: 'Inter-Medium',
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#007AFF',
                    },
                }}
            >
                <Tab.Screen 
                    name="Expenses" 
                    options={{ title: 'Gastos' }}
                >
                    {() => (
                        <ExpensesTab
                            trip={trip}
                            onUpdateTrip={handleUpdateTrip}
                            isDarkMode={isDarkMode}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen 
                    name="Chat" 
                    options={{ title: 'Chat' }}
                >
                    {() => (
                        <ChatTab
                            trip={trip}
                            onUpdateTrip={handleUpdateTrip}
                            isDarkMode={isDarkMode}
                        />
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    tabContainer: {
        flex: 1,
    },
});