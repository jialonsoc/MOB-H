import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddHabitInput({ value, onChangeText, onSubmit }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder="Añadir nuevo hábito"
                placeholderTextColor="#666"
                returnKeyType="done"
                onSubmitEditing={onSubmit}
            />
            <TouchableOpacity 
                style={styles.addButton}
                onPress={onSubmit}
            >
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
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
    }
});