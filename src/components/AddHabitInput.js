import { View, TextInput, TouchableOpacity, StyleSheet, Modal, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { HABIT_TYPES } from '../utils/constants';
import * as ImagePicker from 'expo-image-picker';

export default function AddHabitInput({ value, onChangeText, onSubmit }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [habitName, setHabitName] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (habitName.trim() && selectedCategory) {
            onSubmit(habitName, selectedCategory, image);
            setHabitName('');
            setSelectedCategory('');
            setImage(null);
            setShowModal(false);
        }
    };

    const resetForm = () => {
        setHabitName('');
        setSelectedCategory('');
        setImage(null);
        setShowModal(false);
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
                        <Text style={styles.modalTitle}>Nuevo Hábito</Text>

                        <TextInput
                            style={styles.modalInput}
                            value={habitName}
                            onChangeText={setHabitName}
                            placeholder="Nombre del hábito"
                            placeholderTextColor="#666"
                        />

                        <TouchableOpacity 
                            style={styles.imageContainer}
                            onPress={pickImage}
                        >
                            {image ? (
                                <Image 
                                    source={{ uri: image }} 
                                    style={styles.habitImage} 
                                />
                            ) : (
                                <View style={styles.placeholderContainer}>
                                    <Ionicons name="camera" size={40} color="#666" />
                                    <Text style={styles.placeholderText}>
                                        Añadir foto (opcional)
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.sectionTitle}>Selecciona una categoría</Text>
                        
                        {HABIT_TYPES.filter(type => type.id !== 'all').map((type) => (
                            <TouchableOpacity
                                key={type.id}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === type.id && styles.selectedCategory
                                ]}
                                onPress={() => setSelectedCategory(type.id)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    selectedCategory === type.id && styles.selectedCategoryText
                                ]}>
                                    {type.label}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.cancelButton}
                                onPress={resetForm}
                            >
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[
                                    styles.createButton,
                                    (!habitName.trim() || !selectedCategory) && styles.disabledButton
                                ]}
                                onPress={handleSubmit}
                                disabled={!habitName.trim() || !selectedCategory}
                            >
                                <Text style={styles.createButtonText}>Crear Hábito</Text>
                            </TouchableOpacity>
                        </View>
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
        width: '90%',
        maxHeight: '80%',
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
        padding: 15,
        width: '45%',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ff4444',
    },
    cancelText: {
        color: '#ff4444',
        fontSize: 16,
        fontWeight: 'bold',
    },
    createButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        width: '45%',
        alignItems: 'center',
        borderRadius: 8,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    habitImage: {
        width: '100%',
        height: '100%',
    },
    placeholderContainer: {
        alignItems: 'center',
    },
    placeholderText: {
        color: '#666',
        marginTop: 8,
        fontSize: 12,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    modalInput: {
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});