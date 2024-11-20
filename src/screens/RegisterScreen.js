import { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { isDarkMode } = useThemeContext();
    const { register } = useAuth();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleRegister = async () => {
        // Validaciones
        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Por favor ingresa un email válido');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        try {
            const newUser = {
                id: Date.now().toString(),
                name: name.trim(),
                email: email.trim().toLowerCase(),
                profileImage: null,
                habits: [],
                streakDays: 0,
                createdAt: new Date().toISOString()
            };

            const success = await register(newUser);
            
            if (success) {
                navigation.replace('MainTabs');
            } else {
                Alert.alert('Error', 'No se pudo completar el registro');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error durante el registro');
        }
    };

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: isDarkMode ? '#000' : '#fff' }
        ]}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons 
                            name="arrow-back" 
                            size={24} 
                            color={isDarkMode ? '#fff' : '#000'} 
                        />
                    </TouchableOpacity>

                    <Text style={[
                        styles.title,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        Crear cuenta
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            { 
                                backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                                color: isDarkMode ? '#fff' : '#000'
                            }
                        ]}
                        placeholder="Nombre completo"
                        placeholderTextColor={isDarkMode ? '#999' : '#666'}
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                        returnKeyType="next"
                    />

                    <TextInput
                        style={[
                            styles.input,
                            { 
                                backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                                color: isDarkMode ? '#fff' : '#000'
                            }
                        ]}
                        placeholder="Email"
                        placeholderTextColor={isDarkMode ? '#999' : '#666'}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        returnKeyType="next"
                    />

                    <TextInput
                        style={[
                            styles.input,
                            { 
                                backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                                color: isDarkMode ? '#fff' : '#000'
                            }
                        ]}
                        placeholder="Contraseña"
                        placeholderTextColor={isDarkMode ? '#999' : '#666'}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        returnKeyType="next"
                    />

                    <TextInput
                        style={[
                            styles.input,
                            { 
                                backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                                color: isDarkMode ? '#fff' : '#000'
                            }
                        ]}
                        placeholder="Confirmar contraseña"
                        placeholderTextColor={isDarkMode ? '#999' : '#666'}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        returnKeyType="done"
                        onSubmitEditing={handleRegister}
                    />

                    <TouchableOpacity 
                        style={[
                            styles.registerButton,
                            (!name || !email || !password || !confirmPassword) && 
                            styles.disabledButton
                        ]}
                        onPress={handleRegister}
                        disabled={!name || !email || !password || !confirmPassword}
                    >
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Login')}
                        style={styles.loginLinkContainer}
                    >
                        <Text style={[
                            styles.loginLink,
                            { color: isDarkMode ? '#fff' : '#000' }
                        ]}>
                            ¿Ya tienes cuenta? Inicia sesión
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        flexGrow: 1,
    },
    backButton: {
        marginBottom: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        fontFamily: 'Inter-Bold',
    },
    input: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
    registerButton: {
        backgroundColor: '#34C759',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    loginLinkContainer: {
        marginTop: 20,
        paddingVertical: 10,
    },
    loginLink: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
});
