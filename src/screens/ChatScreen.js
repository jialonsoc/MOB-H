import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [image, setImage] = useState(null);
    const { isDarkMode } = useThemeContext();
    const { user } = useAuth();
    const flatListRef = useRef();

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const savedMessages = await AsyncStorage.getItem('chat_messages');
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() && !image) return;

        const newMsg = {
            id: Date.now().toString(),
            text: newMessage.trim(),
            image: image,
            userId: user?.id || 'guest',
            userName: user?.name || 'Invitado',
            timestamp: new Date().toISOString(),
        };

        const updatedMessages = [...messages, newMsg];
        
        try {
            await AsyncStorage.setItem('chat_messages', JSON.stringify(updatedMessages));
            setMessages(updatedMessages);
            setNewMessage('');
            setImage(null);
            
            // Scroll to bottom
            flatListRef.current?.scrollToEnd();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const renderMessage = ({ item }) => {
        const isOwnMessage = item.userId === (user?.id || 'guest');

        return (
            <View style={[
                styles.messageContainer,
                isOwnMessage ? styles.ownMessage : styles.otherMessage,
                { backgroundColor: isOwnMessage ? 
                    (isDarkMode ? '#0A84FF' : '#007AFF') : 
                    (isDarkMode ? '#333' : '#E5E5EA') 
                }
            ]}>
                {!isOwnMessage && (
                    <Text style={[
                        styles.userName,
                        { color: isDarkMode ? '#999' : '#666' }
                    ]}>
                        {item.userName}
                    </Text>
                )}
                
                {item.image && (
                    <Image 
                        source={{ uri: item.image }}
                        style={styles.messageImage}
                    />
                )}
                
                {item.text && (
                    <Text style={[
                        styles.messageText,
                        { 
                            color: isOwnMessage ? '#fff' : 
                                (isDarkMode ? '#fff' : '#000')
                        }
                    ]}>
                        {item.text}
                    </Text>
                )}
                
                <Text style={[
                    styles.timestamp,
                    { color: isOwnMessage ? '#fff' : '#666' }
                ]}>
                    {new Date(item.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView 
            style={[styles.container, {
                backgroundColor: isDarkMode ? '#000' : '#fff'
            }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messagesList}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            />

            {image && (
                <View style={styles.imagePreview}>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.previewImage} 
                    />
                    <TouchableOpacity 
                        style={styles.removeImage}
                        onPress={() => setImage(null)}
                    >
                        <Ionicons name="close-circle" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                </View>
            )}

            <View style={[
                styles.inputContainer,
                { backgroundColor: isDarkMode ? '#1C1C1E' : '#fff' }
            ]}>
                <TouchableOpacity onPress={pickImage}>
                    <Ionicons 
                        name="image" 
                        size={24} 
                        color="#007AFF" 
                    />
                </TouchableOpacity>

                <TextInput
                    style={[
                        styles.input,
                        { 
                            backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
                            color: isDarkMode ? '#fff' : '#000'
                        }
                    ]}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Escribe un mensaje..."
                    placeholderTextColor={isDarkMode ? '#666' : '#999'}
                    multiline
                />

                <TouchableOpacity 
                    style={[
                        styles.sendButton,
                        (!newMessage.trim() && !image) && styles.sendButtonDisabled
                    ]}
                    onPress={sendMessage}
                    disabled={!newMessage.trim() && !image}
                >
                    <Ionicons 
                        name="send" 
                        size={24} 
                        color={(!newMessage.trim() && !image) ? '#999' : '#fff'} 
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messagesList: {
        padding: 16,
    },
    messageContainer: {
        maxWidth: '80%',
        marginVertical: 4,
        padding: 12,
        borderRadius: 20,
    },
    ownMessage: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    userName: {
        fontSize: 12,
        marginBottom: 4,
    },
    messageText: {
        fontSize: 16,
    },
    messageImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 5,
    },
    mention: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    inputContainer: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePreview: {
        position: 'relative',
        marginBottom: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    removeImage: {
        position: 'absolute',
        top: -10,
        right: -10,
    },
    timestamp: {
        fontSize: 12,
        marginTop: 4,
    },
});