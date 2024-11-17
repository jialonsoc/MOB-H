import { View, TextInput, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { HABIT_TYPES } from '../utils/constants';

export default function AddHabitInput({ value, onChangeText, onSubmit }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [habitName, setHabitName] = useState('');

    const handleSubmit = () => {
        if (habitName.trim() && selectedCategory) {
            onSubmit(habitName, selectedCategory);
            setHabitName('');
            setSelectedCategory('');
            setShowModal(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={habitName}
                onChangeText={setHabitName}
                placeholder="Añadir nuevo hábito"
                placeholderTextColor="#666"
                returnKeyType="done"
                onSubmitEditing={() => setShowModal(true)}
            />
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => setShowModal(true)}
            >
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>

            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecciona una categoría</Text>
                        
                        {HABIT_TYPES.filter(type => type.id !== 'all').map((type) => (
                            <TouchableOpacity
                                key={type.id}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === type.id && styles.selectedCategory
                                ]}
                                onPress={() => {
                                    setSelectedCategory(type.id);
                                    handleSubmit();
                                }}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    selectedCategory === type.id && styles.selectedCategoryText
                                ]}>
                                    {type.label}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity 
                            style={styles.cancelButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 46,
        backgroundColor: '#fff',
        borderRadius: 23,
        paddingHorizontal: 20,
        marginRight: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    addButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    categoryButton: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
    },
    selectedCategory: {
        backgroundColor: '#007AFF',
    },
    categoryText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    cancelButton: {
        marginTop: 10,
        padding: 15,
    },
    cancelText: {
        color: '#ff4444',
        fontSize: 16,
    }
});