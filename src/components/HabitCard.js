import { useState } from 'react';
import { 
    Animated, 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';

export default function HabitCard({ habit, onDelete, onIncrement }) {
    const { isDarkMode } = useThemeContext();
    const translateX = new Animated.Value(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [count, setCount] = useState(habit.count || 0);

    const handleIncrease = () => {
        setCount((prevCount) => prevCount + 1);
        onIncrement(habit.id);
    };

    const handleDecrease = () => {
        setCount((prevCount) => {
            if (prevCount > 0) {
                // Aquí deberías agregar una función onDecrement similar a onIncrement
                return prevCount - 1;
            }
            return prevCount;
        });
    };

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = event => {
        if (event.nativeEvent.translationX < -200) {
            setIsDeleting(true);
            Animated.timing(translateX, {
                toValue: -400,
                duration: 200,
                useNativeDriver: true
            }).start(() => onDelete(habit.id));
        } else {
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true
            }).start();
        }
    };

    return (
        <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
        >
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ translateX }],
                        opacity: translateX.interpolate({
                            inputRange: [-200, 0],
                            outputRange: [0.5, 1],
                        })
                    }
                ]}
            >
                <View style={[styles.card, {
    backgroundColor: isDarkMode ? '#1c1c1e' : '#fff',
}]}>
    {habit.image ? (
        <Image 
            source={{ uri: habit.image }} 
            style={styles.habitImage} 
        />
    ) : (
        <View style={styles.noImageContainer}>
            <Text style={[styles.noImageText, { 
                color: isDarkMode ? '#666' : '#999' 
            }]}>
                X
            </Text>
        </View>
    )}
    <View style={styles.content}>
        <Text style={[styles.title, { 
            color: isDarkMode ? '#fff' : '#000' 
        }]}>{habit.name}</Text>
        <Text style={[styles.count, { 
            color: isDarkMode ? '#999' : '#666' 
        }]}>
            Realizado: {count} veces
        </Text>
    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={handleDecrease}
                        >
                            <Ionicons name="remove-circle" size={24} color="#ff4444" />
                        </TouchableOpacity>
                        <Text style={[styles.counterText, {
                            color: isDarkMode ? '#fff' : '#000'
                        }]}>{count}</Text>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={handleIncrease}
                        >
                            <Ionicons name="add-circle" size={24} color="#007AFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    count: {
        fontSize: 14,
        color: '#666',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 8,
    },
    counterText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    habitImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    noImageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    noImageText: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});