import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import LandingScreen from './src/screens/LandingScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { 
  Inter_400Regular,
  Inter_700Bold 
} from '@expo-google-fonts/inter';

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

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <NavigationContainer onReady={onLayoutRootView}>
                <StatusBar style="auto" />
                <Stack.Navigator 
                    initialRouteName="Landing"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Landing" component={LandingScreen} />
                    <Stack.Screen name="MainTabs" component={TabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}