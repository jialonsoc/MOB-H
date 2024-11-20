import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function LandingScreen({ navigation }) {
    const { isDarkMode } = useThemeContext();

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: isDarkMode ? '#000' : '#fff' }
        ]}>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            
            <View style={styles.content}>
                <Text style={[
                    styles.title,
                    { color: isDarkMode ? '#fff' : '#000' }
                ]}>
                    Bienvenido a HabitsPage
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.loginButton]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.registerButton]}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.guestButton]}
                        onPress={() => navigation.navigate('MainTabs')}
                    >
                        <Text style={[styles.buttonText, styles.guestButtonText]}>
                            Continuar como invitado
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: 'Inter-Bold',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: '#007AFF',
    },
    registerButton: {
        backgroundColor: '#34C759',
    },
    guestButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    guestButtonText: {
        color: '#007AFF',
    },
});