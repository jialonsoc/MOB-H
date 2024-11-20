import { useState, useEffect, useRef } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    TextInput, 
    TouchableOpacity, 
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [image, setImage] = useState(null);
    const [mentionedUsers, setMentionedUsers] = useState([]);
    const { user } = useAuth();
    const { isDarkMode } = useThemeContext();
    const flatListRef = useRef();

    useEffect(() => {
        // Aquí conectarías con tu backend para cargar mensajes
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const response = await fetch('TU_API/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error cargando mensajes:', error);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleMention = (text) => {
        if (text.endsWith('@')) {
            // Aquí podrías mostrar una lista de usuarios para mencionar
            // Por ahora solo agregamos un usuario de ejemplo
            setMentionedUsers([...mentionedUsers, {
                id: '123',
                name: 'Usuario'
            }]);
        }
        setNewMessage(text);
    };

    const sendMessage = async () => {
        if (!newMessage.trim() && !image) return;

        const messageData = new FormData();
        messageData.append('text', newMessage);
        messageData.append('mentionedUsers', JSON.stringify(mentionedUsers));
        
        if (image) {
            messageData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
        }

        try {
            const response = await fetch('TU_API/messages', {
                method: 'POST',
                body: messageData,
            });

            if (response.ok) {
                setNewMessage('');
                setImage(null);
                setMentionedUsers([]);
                loadMessages();
            }
        } catch (error) {
            console.error('Error enviando mensaje:', error);
        }
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Por favor inicia sesión para acceder al chat</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            style={[styles.container, { 
                backgroundColor: isDarkMode ? '#000' : '#fff' 
            }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[
                        styles.messageContainer,
                        item.userId === user.id ? styles.ownMessage : styles.otherMessage
                    ]}>
                        {item.image && (
                            <Image 
                                source={{ uri: item.image }} 
                                style={styles.messageImage} 
                            />
                        )}
                        <Text style={[
                            styles.messageText,
                            { color: isDarkMode ? '#fff' : '#000' }
                        ]}>
                            {item.text}
                        </Text>
                        {item.mentionedUsers?.map(mentioned => (
                            <Text key={mentioned.id} style={styles.mention}>
                                @{mentioned.name}
                            </Text>
                        ))}
                    </View>
                )}
                onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            />

            <View style={styles.inputContainer}>
                {image && (
                    <View style={styles.imagePreview}>
                        <Image source={{ uri: image }} style={styles.previewImage} />
                        <TouchableOpacity 
                            style={styles.removeImage}
                            onPress={() => setImage(null)}
                        >
                            <Ionicons name="close-circle" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.inputRow}>
                    <TouchableOpacity onPress={pickImage}>
                        <Ionicons name="image" size={24} color="#007AFF" />
                    </TouchableOpacity>

                    <TextInput
                        style={[styles.input, { 
                            color: isDarkMode ? '#fff' : '#000' 
                        }]}
                        value={newMessage}
                        onChangeText={handleMention}
                        placeholder="Escribe un mensaje..."
                        placeholderTextColor={isDarkMode ? '#666' : '#999'}
                    />

                    <TouchableOpacity 
                        style={styles.sendButton}
                        onPress={sendMessage}
                    >
                        <Ionicons name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageContainer: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    ownMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
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
});