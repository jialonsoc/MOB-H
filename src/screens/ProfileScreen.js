import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform
} from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
    const { isDarkMode, toggleTheme } = useThemeContext();
    const { user, setUser, logout } = useAuth();
    const [image, setImage] = useState(user?.profileImage);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                // Aquí irían las funciones para actualizar la imagen en el backend
            }
        } catch (error) {
            console.error('Error al seleccionar imagen:', error);
        }
    };

    return (
        <ScrollView 
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? '#000' : '#fff' }
            ]}
        >
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.profileImageContainer}
                    onPress={pickImage}
                >
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={[
                            styles.profileImagePlaceholder,
                            { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' }
                        ]}>
                            <Ionicons 
                                name="person" 
                                size={40} 
                                color={isDarkMode ? '#666' : '#999'}
                            />
                        </View>
                    )}
                    <View style={styles.editIconContainer}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>

                <Text style={[
                    styles.username,
                    { color: isDarkMode ? '#fff' : '#000' }
                ]}>
                    {user?.name || 'Usuario'}
                </Text>
                <Text style={[
                    styles.email,
                    { color: isDarkMode ? '#999' : '#666' }
                ]}>
                    {user?.email || 'usuario@ejemplo.com'}
                </Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={[
                        styles.statNumber,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        {user?.habits?.length || 0}
                    </Text>
                    <Text style={[
                        styles.statLabel,
                        { color: isDarkMode ? '#999' : '#666' }
                    ]}>
                        Hábitos
                    </Text>
                </View>
                
                <View style={styles.statItem}>
                    <Text style={[
                        styles.statNumber,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        {user?.streakDays || 0}
                    </Text>
                    <Text style={[
                        styles.statLabel,
                        { color: isDarkMode ? '#999' : '#666' }
                    ]}>
                        Días seguidos
                    </Text>
                </View>
            </View>

            <View style={styles.settingsContainer}>
                <TouchableOpacity 
                    style={[
                        styles.settingItem,
                        { borderBottomColor: isDarkMode ? '#333' : '#f0f0f0' }
                    ]}
                >
                    <Ionicons 
                        name="notifications-outline" 
                        size={24} 
                        color={isDarkMode ? '#fff' : '#000'}
                    />
                    <Text style={[
                        styles.settingText,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        Notificaciones
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[
                        styles.settingItem,
                        { borderBottomColor: isDarkMode ? '#333' : '#f0f0f0' }
                    ]}
                    onPress={toggleTheme}
                >
                    <Ionicons 
                        name={isDarkMode ? "sunny-outline" : "moon-outline"}
                        size={24} 
                        color={isDarkMode ? '#fff' : '#000'}
                    />
                    <Text style={[
                        styles.settingText,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.settingItem}
                    onPress={logout}
                >
                    <Ionicons 
                        name="log-out-outline" 
                        size={24} 
                        color="#ff4444"
                    />
                    <Text style={[styles.settingText, { color: '#ff4444' }]}>
                        Cerrar sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        padding: 20,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        position: 'relative',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    profileImagePlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007AFF',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
    },
    settingsContainer: {
        padding: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    settingText: {
        fontSize: 16,
        marginLeft: 15,
    },
});