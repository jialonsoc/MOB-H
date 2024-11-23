import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Share,
    Alert,
    Platform
} from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TripCard from '../components/TripCard';
import CreateTripModal from '../components/CreateTripModal';
import JoinTripModal from '../components/JoinTripModal';

export default function TripsScreen({ navigation }) {
    const { isDarkMode } = useThemeContext();
    const { user } = useAuth();
    const [trips, setTrips] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        try {
            const savedTrips = await AsyncStorage.getItem('trips');
            if (savedTrips) {
                setTrips(JSON.parse(savedTrips));
            }
        } catch (error) {
            console.error('Error loading trips:', error);
        }
    };

    const handleCreateTrip = async (newTrip) => {
        try {
            const tripWithId = {
                ...newTrip,
                id: Date.now().toString(),
                createdBy: user.id,
                participants: [user.id],
                code: Math.random().toString(36).substring(2, 8).toUpperCase()
            };

            const updatedTrips = [...trips, tripWithId];
            await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips));
            setTrips(updatedTrips);
            setShowCreateModal(false);
        } catch (error) {
            console.error('Error al crear el viaje:', error);
            if (Platform.OS === 'web') {
                window.alert('Error al crear el viaje');
            } else {
                Alert.alert('Error', 'No se pudo crear el viaje');
            }
        }
    };

    const handleJoinTrip = async (code) => {
        try {
            const tripToJoin = trips.find(trip => trip.code === code);
            if (!tripToJoin) {
                Alert.alert('Error', 'Código de viaje no válido');
                return;
            }

            if (tripToJoin.participants.some(p => p.id === user.id)) {
                Alert.alert('Error', 'Ya eres participante de este viaje');
                return;
            }

            const updatedTrips = trips.map(trip => {
                if (trip.id === tripToJoin.id) {
                    return {
                        ...trip,
                        participants: [...trip.participants, { id: user.id, name: user.name }]
                    };
                }
                return trip;
            });

            await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips));
            setTrips(updatedTrips);
            setShowJoinModal(false);
        } catch (error) {
            Alert.alert('Error', 'No se pudo unir al viaje');
        }
    };

    const shareTrip = async (trip) => {
        try {
            await Share.share({
                message: `¡Únete a mi viaje "${trip.name}" en HabitsPage! Usa el código: ${trip.code}`,
            });
        } catch (error) {
            Alert.alert('Error', 'No se pudo compartir el viaje');
        }
    };

    const renderTrip = ({ item }) => (
        <TripCard
            trip={item}
            onPress={() => navigation.navigate('TripDetails', { tripId: item.id })}
            onShare={() => shareTrip(item)}
            isDarkMode={isDarkMode}
        />
    );

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
                    Mis Viajes
                </Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setShowJoinModal(true)}
                    >
                        <Ionicons name="enter-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setShowCreateModal(true)}
                    >
                        <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={trips}
                renderItem={renderTrip}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.tripsList}
                ListEmptyComponent={
                    <Text style={[
                        styles.emptyText,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        No tienes viajes activos
                    </Text>
                }
            />

            <CreateTripModal
                visible={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateTrip}
                isDarkMode={isDarkMode}
            />

            <JoinTripModal
                visible={showJoinModal}
                onClose={() => setShowJoinModal(false)}
                onSubmit={handleJoinTrip}
                isDarkMode={isDarkMode}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    headerButtons: {
        flexDirection: 'row',
    },
    headerButton: {
        marginLeft: 15,
        padding: 5,
    },
    tripsList: {
        flexGrow: 1,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        marginTop: 20,
    },
});