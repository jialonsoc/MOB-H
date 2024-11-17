import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

export default function StatsScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Estadísticas
        </Text>
        <View style={styles.statsContainer}>
          {/* Aquí puedes agregar tus componentes de estadísticas */}
          <Text style={[styles.statsText, { color: colors.text }]}>
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
    backgroundColor: '#fff',
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