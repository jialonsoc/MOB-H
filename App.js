import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { 
    Inter_400Regular,
    Inter_700Bold 
} from '@expo-google-fonts/inter';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function Navigation() {
    const { user, loading } = useAuth();
    const [fontsLoaded] = useFonts({
        'Inter-Regular': Inter_400Regular,
        'Inter-Bold': Inter_700Bold,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded || loading) {
        return null;
    }

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            <StatusBar style="auto" />
            <Stack.Navigator 
                initialRouteName={user ? "MainTabs" : "Landing"}
                screenOptions={{ headerShown: false }}
            >
                {user ? (
                    // Rutas autenticadas
                    <Stack.Screen name="MainTabs" component={TabNavigator} />
                ) : (
                    // Rutas públicas
                    <>
                        <Stack.Screen name="Landing" component={LandingScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Navigation />
            </ThemeProvider>
        </AuthProvider>
    );
}