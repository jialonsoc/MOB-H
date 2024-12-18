import { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { 
    Inter_400Regular,
    Inter_700Bold 
} from '@expo-google-fonts/inter';
import { loadSeeds } from './src/utils/seeds';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Inter-Regular': Inter_400Regular,
        'Inter-Bold': Inter_700Bold,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        if (__DEV__) { // Solo en desarrollo
            loadSeeds();
        }
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <AuthProvider>
            <ThemeProvider>
                <NavigationContainer onReady={onLayoutRootView}>
                    <StatusBar style="auto" />
                    <Stack.Navigator 
                        initialRouteName="Landing"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name="Landing" component={LandingScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="MainTabs" component={TabNavigator} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </AuthProvider>
    );
}