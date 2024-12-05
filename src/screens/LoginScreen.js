import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { isDarkMode } = useThemeContext();

    const handleLogin = async () => {
        try {
            if (!email.trim() || !password.trim()) {
                Alert.alert('Error', 'Por favor completa todos los campos');
                return;
            }

            await login(email, password);
            // La navegación se manejará automáticamente por el navigator
        } catch (error) {
            console.error('Error en login:', error);
            Alert.alert(
                'Error',
                'No se pudo iniciar sesión. Por favor intenta de nuevo.'
            );
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }
            ]}
        >
            <View style={styles.formContainer}>
                <Text style={[
                    styles.title,
                    { color: isDarkMode ? '#fff' : '#000' }
                ]}>
                    Iniciar Sesión
                </Text>

                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                            color: isDarkMode ? '#fff' : '#000',
                            borderColor: isDarkMode ? '#666' : '#ddd'
                        }
                    ]}
                    placeholder="Email"
                    placeholderTextColor={isDarkMode ? '#999' : '#666'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                            color: isDarkMode ? '#fff' : '#000',
                            borderColor: isDarkMode ? '#666' : '#ddd'
                        }
                    ]}
                    placeholder="Contraseña"
                    placeholderTextColor={isDarkMode ? '#999' : '#666'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={[
                        styles.registerButtonText,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        ¿No tienes cuenta? Regístrate
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
    loginButton: {
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    registerButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    registerButtonText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
});
