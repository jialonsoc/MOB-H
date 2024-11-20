import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useThemeContext } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const { isDarkMode } = useThemeContext();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Stats') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: isDarkMode ? '#000' : '#fff',
                    borderTopColor: isDarkMode ? '#333' : '#e5e5e5',
                },
                headerStyle: {
                    backgroundColor: isDarkMode ? '#000' : '#fff',
                },
                headerTintColor: isDarkMode ? '#fff' : '#000',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
            <Tab.Screen name="Stats" component={StatsScreen} options={{ title: 'Estadísticas' }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
        </Tab.Navigator>
    );
}