import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useThemeContext } from '../context/ThemeContext';

export default function StatsScreen() {
  const { colors } = useTheme();
  const { isDarkMode } = useThemeContext();

  return (
    <SafeAreaView style={[styles.container, { 
      backgroundColor: isDarkMode ? '#000' : '#fff' 
    }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={styles.content}>
        <Text style={[styles.title, { 
          color: isDarkMode ? '#fff' : '#000' 
        }]}>
          Estadísticas
        </Text>
        <View style={styles.statsContainer}>
          <Text style={[styles.statsText, { 
            color: isDarkMode ? '#fff' : '#000' 
          }]}>
            Tus estadísticas aparecerán aquí
          </Text>
        </View>
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
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
  }
});