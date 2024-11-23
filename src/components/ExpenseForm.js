import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

export default function ExpenseForm({ onSubmit, onCancel, isDarkMode }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [participants, setParticipants] = useState('');

    const handleSubmit = () => {
        if (!description || !amount || !participants) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        const numParticipants = parseInt(participants);
        if (isNaN(numParticipants) || numParticipants < 2) {
            Alert.alert('Error', 'Debe haber al menos 2 participantes');
            return;
        }

        const totalAmount = parseFloat(amount);
        if (isNaN(totalAmount) || totalAmount <= 0) {
            Alert.alert('Error', 'El monto debe ser mayor a 0');
            return;
        }

        const amountPerPerson = totalAmount / numParticipants;

        onSubmit({
            description,
            totalAmount,
            numParticipants,
            amountPerPerson,
            date: new Date().toISOString(),
            paidBy: 'current_user', // Esto debería venir del contexto de autenticación
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={[
                styles.label,
                { color: isDarkMode ? '#fff' : '#000' }
            ]}>
                Descripción del gasto
            </Text>
            <TextInput
                style={[
                    styles.input,
                    { 
                        backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                        color: isDarkMode ? '#fff' : '#000'
                    }
                ]}
                value={description}
                onChangeText={setDescription}
                placeholder="Ej: Cena, Supermercado, etc."
                placeholderTextColor={isDarkMode ? '#999' : '#666'}
            />

            <Text style={[
                styles.label,
                { color: isDarkMode ? '#fff' : '#000' }
            ]}>
                Monto total
            </Text>
            <TextInput
                style={[
                    styles.input,
                    { 
                        backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                        color: isDarkMode ? '#fff' : '#000'
                    }
                ]}
                value={amount}
                onChangeText={setAmount}
                placeholder="$0.00"
                placeholderTextColor={isDarkMode ? '#999' : '#666'}
                keyboardType="numeric"
            />

            <Text style={[
                styles.label,
                { color: isDarkMode ? '#fff' : '#000' }
            ]}>
                Número de participantes
            </Text>
            <TextInput
                style={[
                    styles.input,
                    { 
                        backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                        color: isDarkMode ? '#fff' : '#000'
                    }
                ]}
                value={participants}
                onChangeText={setParticipants}
                placeholder="2"
                placeholderTextColor={isDarkMode ? '#999' : '#666'}
                keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.submitButton]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={onCancel}
                >
                    <Text style={[
                        styles.buttonText,
                        { color: '#FF3B30' }
                    ]}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: 'Inter-Regular',
    },
    input: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    submitButton: {
        backgroundColor: '#34C759',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
});