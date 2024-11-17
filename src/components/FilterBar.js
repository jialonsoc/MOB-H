import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FILTERS = [
    { id: 'all', label: 'Todos' },
    { id: 'personal', label: 'Personal' },
    { id: 'trabajo', label: 'Trabajo' },
    { id: 'salud', label: 'Salud' }
];

export default function FilterBar({ selectedFilter, onFilterChange }) {
    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        >
            {FILTERS.map(filter => (
                <TouchableOpacity
                    key={filter.id}
                    style={[
                        styles.filterButton,
                        selectedFilter === filter.id && styles.selectedFilter
                    ]}
                    onPress={() => onFilterChange(filter.id)}
                >
                    <Text style={[
                        styles.filterText,
                        selectedFilter === filter.id && styles.selectedFilterText
                    ]}>
                        {filter.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    selectedFilter: {
        backgroundColor: '#007AFF',
    },
    filterText: {
        color: '#666',
    },
    selectedFilterText: {
        color: '#fff',
    }
});