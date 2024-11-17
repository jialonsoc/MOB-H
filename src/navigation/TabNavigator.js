import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useThemeContext } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const { isDarkMode } = useThemeContext();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Hábitos') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Estadísticas') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Ajustes') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: isDarkMode ? '#666' : 'gray',
                tabBarStyle: {
                    backgroundColor: isDarkMode ? '#000' : '#fff',
                    borderTopColor: isDarkMode ? '#333' : '#eee',
                },
                headerStyle: {
                    backgroundColor: isDarkMode ? '#000' : '#fff',
                },
                headerTintColor: isDarkMode ? '#fff' : '#000',
            })}
        >
            <Tab.Screen name="Hábitos" component={HomeScreen} />
            <Tab.Screen name="Estadísticas" component={StatsScreen} />
            <Tab.Screen name="Ajustes" component={SettingsScreen} />
        </Tab.Navigator>
    );
}