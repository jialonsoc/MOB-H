import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JoinTripModal({ visible, onClose, onSubmit, isDarkMode }) {
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        if (!code.trim()) {
            Alert.alert('Error', 'Por favor ingresa un código');
            return;
        }
        onSubmit(code.trim().toUpperCase());
        setCode('');
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={[
                    styles.modalContent,
                    { backgroundColor: isDarkMode ? '#333' : '#fff' }
                ]}>
                    <View style={styles.header}>
                        <Text style={[
                            styles.title,
                            { color: isDarkMode ? '#fff' : '#000' }
                        ]}>
                            Unirse a un viaje
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Ionicons 
                                name="close" 
                                size={24} 
                                color={isDarkMode ? '#fff' : '#000'} 
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={[
                        styles.description,
                        { color: isDarkMode ? '#ccc' : '#666' }
                    ]}>
                        Ingresa el código del viaje al que quieres unirte
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            { 
                                backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
                                color: isDarkMode ? '#fff' : '#000'
                            }
                        ]}
                        placeholder="Código del viaje"
                        placeholderTextColor={isDarkMode ? '#999' : '#666'}
                        value={code}
                        onChangeText={setCode}
                        autoCapitalize="characters"
                        maxLength={6}
                    />

                    <TouchableOpacity
                        style={[
                            styles.joinButton,
                            !code.trim() && styles.disabledButton
                        ]}
                        onPress={handleSubmit}
                        disabled={!code.trim()}
                    >
                        <Text style={styles.joinButtonText}>
                            Unirse al viaje
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    closeButton: {
        padding: 4,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: 'Inter-Regular',
    },
    input: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 20,
        textAlign: 'center',
        letterSpacing: 2,
        marginBottom: 20,
        fontFamily: 'Inter-Bold',
    },
    joinButton: {
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    joinButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
});