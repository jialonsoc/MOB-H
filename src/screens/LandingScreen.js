import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function LandingScreen({ navigation }) {
  const { isDarkMode } = useThemeContext();

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#000' : '#fff' }
    ]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.content}>
        <Text style={[
          styles.title,
          { color: isDarkMode ? '#fff' : '#000' }
        ]}>
          Bienvenido a HabitsPage
        </Text>
        
        <Text style={[
          styles.subtitle,
          { color: isDarkMode ? '#ccc' : '#666' }
        ]}>
          Construye hábitos positivos, un día a la vez
        </Text>

        <View style={styles.imageContainer}>
          {/* Puedes agregar una imagen ilustrativa aquí */}
          <Image
            source={require('../../assets/habits-icon.png')} // Asegúrate de tener esta imagen
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.featuresContainer}>
          <View style={[
            styles.featureCard,
            { backgroundColor: isDarkMode ? '#1c1c1e' : '#f5f5f5' }
          ]}>
            <Text style={[
              styles.featureTitle,
              { color: isDarkMode ? '#fff' : '#000' }
            ]}>
              Seguimiento Diario
            </Text>
            <Text style={[
              styles.featureText,
              { color: isDarkMode ? '#ccc' : '#666' }
            ]}>
              Registra y monitorea tus hábitos diariamente
            </Text>
          </View>

          <View style={[
            styles.featureCard,
            { backgroundColor: isDarkMode ? '#1c1c1e' : '#f5f5f5' }
          ]}>
            <Text style={[
              styles.featureTitle,
              { color: isDarkMode ? '#fff' : '#000' }
            ]}>
              Estadísticas Detalladas
            </Text>
            <Text style={[
              styles.featureText,
              { color: isDarkMode ? '#ccc' : '#666' }
            ]}>
              Visualiza tu progreso con gráficos intuitivos
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.buttonText}>
            Comenzar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: 200,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featureText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});