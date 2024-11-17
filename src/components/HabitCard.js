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

export default function HabitCard({ habit, onDelete, onIncrement }) {
    const translateX = new Animated.Value(0);
    const [isDeleting, setIsDeleting] = useState(false);

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
                <View style={styles.card}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{habit.name}</Text>
                        <Text style={styles.count}>
                            Realizado: {habit.count || 0} veces
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.incrementButton}
                        onPress={() => onIncrement(habit.id)}
                    >
                        <Ionicons name="add-circle" size={24} color="#007AFF" />
                    </TouchableOpacity>
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
    incrementButton: {
        padding: 8,
    }
});