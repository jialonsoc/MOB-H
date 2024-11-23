import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TripCard({ trip, onPress, onShare, isDarkMode }) {
    return (
        <TouchableOpacity
            style={[
                styles.card,
                { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }
            ]}
            onPress={onPress}
        >
            <View style={styles.header}>
                <Text style={[
                    styles.name,
                    { color: isDarkMode ? '#fff' : '#000' }
                ]}>
                    {trip.name}
                </Text>
                <TouchableOpacity onPress={onShare}>
                    <Ionicons name="share-outline" size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>

            <Text style={[
                styles.description,
                { color: isDarkMode ? '#ccc' : '#666' }
            ]}>
                {trip.description}
            </Text>

            <View style={styles.details}>
                <View style={styles.dateContainer}>
                    <Text style={[
                        styles.dateLabel,
                        { color: isDarkMode ? '#999' : '#666' }
                    ]}>
                        {new Date(trip.startDate).toLocaleDateString()} - 
                        {new Date(trip.endDate).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.participantsContainer}>
                    <Text style={[
                        styles.participantsCount,
                        { color: isDarkMode ? '#999' : '#666' }
                    ]}>
                        {trip.participants.length} participantes
                    </Text>
                </View>
            </View>

            <View style={styles.codeContainer}>
                <Text style={[
                    styles.codeLabel,
                    { color: isDarkMode ? '#999' : '#666' }
                ]}>
                    Código: 
                </Text>
                <Text style={[
                    styles.code,
                    { color: isDarkMode ? '#fff' : '#000' }
                ]}>
                    {trip.code}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    description: {
        fontSize: 14,
        marginBottom: 12,
        fontFamily: 'Inter-Regular',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dateContainer: {
        flex: 1,
    },
    dateLabel: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
    },
    participantsContainer: {
        marginLeft: 8,
    },
    participantsCount: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    codeLabel: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
    },
    code: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
        fontFamily: 'Inter-Bold',
    },
});