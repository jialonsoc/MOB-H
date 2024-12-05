import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';
import { storage } from '../utils/storage';
import CreateTripModal from '../components/CreateTripModal';
import { Ionicons } from '@expo/vector-icons';

export default function TripsScreen({ navigation }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useThemeContext();
    const { user } = useAuth();

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        try {
            setLoading(true);
            const savedTrips = await storage.load('trips') || [];
            setTrips(savedTrips);
        } catch (error) {
            console.error('Error al cargar viajes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTrip = async (newTrip) => {
        try {
            if (!user) {
                Alert.alert('Error', 'Debes iniciar sesión para crear un viaje');
                return;
            }

            const tripWithId = {
                ...newTrip,
                id: Date.now().toString(),
                createdBy: user.id,
                participants: [user.id],
                code: Math.random().toString(36).substring(2, 8).toUpperCase()
            };

            const updatedTrips = await storage.saveTrip(tripWithId);
            setTrips(updatedTrips);
            setShowCreateModal(false);
        } catch (error) {
            console.error('Error al crear el viaje:', error);
            Alert.alert('Error', 'No se pudo crear el viaje');
        }
    };

    const renderTripItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.tripCard,
                { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }
            ]}
            onPress={() => navigation.navigate('TripDetails', { trip: item })}
        >
            <Text style={[
                styles.tripName,
                { color: isDarkMode ? '#fff' : '#000' }
            ]}>
                {item.name}
            </Text>
            <Text style={[
                styles.tripDate,
                { color: isDarkMode ? '#ccc' : '#666' }
            ]}>
                {new Date(item.startDate).toLocaleDateString()} - 
                {new Date(item.endDate).toLocaleDateString()}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={[
            styles.container,
            { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }
        ]}>
            <FlatList
                data={trips}
                renderItem={renderTripItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => setShowCreateModal(true)}
            >
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>

            <CreateTripModal
                visible={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateTrip}
                isDarkMode={isDarkMode}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
        paddingBottom: 80, // Espacio para el FAB
    },
    tripCard: {
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tripName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'Inter-Bold',
    },
    tripDate: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});