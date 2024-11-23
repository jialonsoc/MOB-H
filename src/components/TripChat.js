import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function TripChat({ tripId, messages, onSendMessage, isDarkMode }) {
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState('');
    const flatListRef = useRef();

    const renderMessage = ({ item }) => {
        const isMyMessage = item.userId === user.id;
        
        return (
            <View style={[
                styles.messageContainer,
                isMyMessage ? styles.myMessage : styles.otherMessage,
                { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }
            ]}>
                {!isMyMessage && (
                    <Text style={[
                        styles.messageSender,
                        { color: isDarkMode ? '#ccc' : '#666' }
                    ]}>
                        {item.userName}
                    </Text>
                )}
                <Text style={[
                    styles.messageText,
                    { color: isDarkMode ? '#fff' : '#000' }
                ]}>
                    {item.text}
                </Text>
                <Text style={[
                    styles.messageTime,
                    { color: isDarkMode ? '#999' : '#666' }
                ]}>
                    {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
            </View>
        );
    };

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage({
                text: newMessage.trim(),
                userId: user.id,
                userName: user.name,
                timestamp: new Date().toISOString(),
            });
            setNewMessage('');
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={100}
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.timestamp}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                contentContainerStyle={styles.messagesList}
            />
            
            <View style={[
                styles.inputContainer,
                { backgroundColor: isDarkMode ? '#222' : '#fff' }
            ]}>
                <TextInput
                    style={[
                        styles.input,
                        { 
                            backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                            color: isDarkMode ? '#fff' : '#000'
                        }
                    ]}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Escribe un mensaje..."
                    placeholderTextColor={isDarkMode ? '#999' : '#666'}
                />
                <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={handleSend}
                >
                    <Ionicons 
                        name="send" 
                        size={24} 
                        color="#007AFF" 
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
        padding: 12,
        borderRadius: 16,
        marginBottom: 8,
    },
    myMessage: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    messageSender: {
        fontSize: 12,
        marginBottom: 4,
        fontFamily: 'Inter-Medium',
    },
    messageText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
    messageTime: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
        fontFamily: 'Inter-Regular',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
        fontFamily: 'Inter-Regular',
    },
    sendButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});