import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function CreateTripModal({ visible, onClose, onSubmit, isDarkMode }) {
    const [tripName, setTripName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const handleSubmit = () => {
        if (!tripName.trim()) {
            if (Platform.OS === 'web') {
                window.alert('Por favor ingresa un nombre para el viaje');
            } else {
                Alert.alert('Error', 'Por favor ingresa un nombre para el viaje');
            }
            return;
        }

        if (endDate < startDate) {
            if (Platform.OS === 'web') {
                window.alert('La fecha de término debe ser posterior a la fecha de inicio');
            } else {
                Alert.alert('Error', 'La fecha de término debe ser posterior a la fecha de inicio');
            }
            return;
        }

        const newTrip = {
            name: tripName.trim(),
            description: description.trim(),
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            participants: [],
            expenses: [],
            messages: []
        };

        onSubmit(newTrip);
        setTripName('');
        setDescription('');
        setStartDate(new Date());
        setEndDate(new Date());
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderDatePicker = (date, onChange, show, setShow, label) => {
        if (Platform.OS === 'web') {
            return (
                <View style={styles.dateContainer}>
                    <Text style={[styles.dateLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
                        {label}
                    </Text>
                    <input
                        type="date"
                        value={date.toISOString().split('T')[0]}
                        onChange={(e) => onChange(new Date(e.target.value))}
                        style={{
                            ...styles.webDateInput,
                            backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
                            color: isDarkMode ? '#fff' : '#000',
                            borderColor: isDarkMode ? '#666' : '#ddd'
                        }}
                    />
                </View>
            );
        }

        return (
            <View style={styles.dateContainer}>
                <Text style={[styles.dateLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
                    {label}
                </Text>
                <TouchableOpacity
                    style={[
                        styles.dateButton,
                        {
                            backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
                            borderColor: isDarkMode ? '#666' : '#ddd'
                        }
                    ]}
                    onPress={() => setShow(true)}
                >
                    <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
                        {formatDate(date)}
                    </Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShow(false);
                            if (selectedDate) {
                                onChange(selectedDate);
                            }
                        }}
                    />
                )}
            </View>
        );
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
                    <Text style={[
                        styles.modalTitle,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        Crear Nuevo Viaje
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
                                color: isDarkMode ? '#fff' : '#000',
                                borderColor: isDarkMode ? '#666' : '#ddd'
                            }
                        ]}
                        placeholder="Nombre del viaje"
                        placeholderTextColor={isDarkMode ? '#999' : '#666'}
                        value={tripName}
                        onChangeText={setTripName}
                    />

                    <TextInput
                        style={[
                            styles.input,
                            styles.descriptionInput,
                            {
                                backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
                                color: isDarkMode ? '#fff' : '#000',
                                borderColor: isDarkMode ? '#666' : '#ddd'
                            }
                        ]}
                        placeholder="Descripción (opcional)"
                        placeholderTextColor={isDarkMode ? '#999' : '#666'}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

                    {renderDatePicker(startDate, setStartDate, showStartPicker, setShowStartPicker, "Fecha de inicio")}
                    {renderDatePicker(endDate, setEndDate, showEndPicker, setShowEndPicker, "Fecha de término")}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.createButton]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Crear</Text>
                        </TouchableOpacity>
                    </View>
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
        maxWidth: 400,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        ...Platform.select({
            web: {
                boxShadow: '0px 2px 10px rgba(0,0,0,0.1)'
            },
            default: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }
        })
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#ff3b30',
    },
    createButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    dateContainer: {
        marginBottom: 15,
    },
    dateLabel: {
        fontSize: 14,
        marginBottom: 5,
        fontFamily: 'Inter-Regular',
    },
    dateButton: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    webDateInput: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        width: '100%',
        borderStyle: 'solid',
        fontFamily: 'Inter-Regular',
    }
});