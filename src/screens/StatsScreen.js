import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useThemeContext } from '../context/ThemeContext';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function StatsScreen() {
  const { colors } = useTheme();
  const { isDarkMode } = useThemeContext();
  const [habits, setHabits] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadHabits = async () => {
        try {
          const savedHabits = await AsyncStorage.getItem('habits');
          if (savedHabits) {
            setHabits(JSON.parse(savedHabits));
            setRefreshKey(prev => prev + 1);
          }
        } catch (error) {
          console.error('Error loading habits:', error);
        }
      };

      loadHabits();

      const intervalId = setInterval(loadHabits, 1000);

      return () => clearInterval(intervalId);
    }, [])
  );

  const chartData = {
    labels: habits.map(habit => habit.name.substring(0, 10) + (habit.name.length > 10 ? '...' : '')),
    datasets: [{
      data: habits.map(habit => habit.count || 0)
    }]
  };

  const chartConfig = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
    backgroundGradientFrom: isDarkMode ? '#000' : '#fff',
    backgroundGradientTo: isDarkMode ? '#000' : '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.5,
    propsForLabels: {
      fontSize: 12,
    },
  };

  return (
    <SafeAreaView style={[styles.container, { 
      backgroundColor: isDarkMode ? '#000' : '#fff' 
    }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={styles.content}>
        <Text style={[styles.title, { 
          color: isDarkMode ? '#fff' : '#000' 
        }]}>
          Estadísticas de Hábitos
        </Text>
        
        {habits.length > 0 ? (
          <View style={styles.chartContainer}>
            <BarChart
              key={refreshKey}
              data={chartData}
              width={Dimensions.get('window').width - 40}
              height={220}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              showValuesOnTopOfBars={true}
              fromZero={true}
              style={styles.chart}
            />
            <Text style={[styles.chartLabel, { 
              color: isDarkMode ? '#fff' : '#000' 
            }]}>
              Frecuencia de Hábitos
            </Text>
          </View>
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={[styles.noDataText, { 
              color: isDarkMode ? '#fff' : '#000' 
            }]}>
              No hay datos de hábitos disponibles
            </Text>
          </View>
        )}

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, {
            backgroundColor: isDarkMode ? '#1c1c1e' : '#f5f5f5'
          }]}>
            <Text style={[styles.statTitle, { 
              color: isDarkMode ? '#fff' : '#000' 
            }]}>
              Total de Hábitos
            </Text>
            <Text style={[styles.statNumber, { 
              color: isDarkMode ? '#fff' : '#000' 
            }]}>
              {habits.length}
            </Text>
          </View>

          <View style={[styles.statCard, {
            backgroundColor: isDarkMode ? '#1c1c1e' : '#f5f5f5'
          }]}>
            <Text style={[styles.statTitle, { 
              color: isDarkMode ? '#fff' : '#000' 
            }]}>
              Total Completados
            </Text>
            <Text style={[styles.statNumber, { 
              color: isDarkMode ? '#fff' : '#000' 
            }]}>
              {habits.reduce((sum, habit) => sum + (habit.count || 0), 0)}
            </Text>
          </View>
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
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartLabel: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
  }
});