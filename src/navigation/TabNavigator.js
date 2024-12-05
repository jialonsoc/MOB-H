import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import TripsScreen from '../screens/TripsScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';

const Tab = createBottomTabNavigator();
const TripsStack = createNativeStackNavigator();

function TripsStackNavigator() {
    return (
        <TripsStack.Navigator>
            <TripsStack.Screen 
                name="TripsMain" 
                component={TripsScreen}
                options={{ headerShown: false }}
            />
            <TripsStack.Screen 
                name="TripDetails" 
                component={TripDetailsScreen}
                options={{ title: 'Detalles del Viaje' }}
            />
        </TripsStack.Navigator>
    );
}

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Stats') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Trips') {
                        iconName = focused ? 'airplane' : 'airplane-outline';
                    } else if (route.name === 'Expenses') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
            <Tab.Screen name="Trips" component={TripsStackNavigator} />
            <Tab.Screen name="Expenses" component={ExpensesScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}