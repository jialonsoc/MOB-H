import { useState } from 'react';
import { 
    View, 
    TextInput, 
    TouchableOpacity, 
    Text, 
    StyleSheet,
    Alert 
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { isDarkMode } = useThemeContext();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        const success = await login(email, password);
        if (!success) {
            Alert.alert('Error', 'Credenciales inválidas');
        }
    };

    return (
        <View style={[
            styles.container,
            { backgroundColor: isDarkMode ? '#000' : '#fff' }
        ]}>
            <Text style={[
                styles.title,
                { color: isDarkMode ? '#fff' : '#000' }
            ]}>
                Iniciar Sesión
            </Text>

            <TextInput
                style={[styles.input, { 
                    backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                    color: isDarkMode ? '#fff' : '#000'
                }]}
                placeholder="Email"
                placeholderTextColor={isDarkMode ? '#999' : '#666'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={[styles.input, { 
                    backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                    color: isDarkMode ? '#fff' : '#000'
                }]}
                placeholder="Contraseña"
                placeholderTextColor={isDarkMode ? '#999' : '#666'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity 
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={[
                    styles.linkText,
                    { color: isDarkMode ? '#fff' : '#000' }
                ]}>
                    ¿No tienes cuenta? Regístrate
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
    },
});
