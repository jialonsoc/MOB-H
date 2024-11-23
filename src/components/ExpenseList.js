import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExpenseList({ expenses, currentUserId, isDarkMode }) {
    const calculateTotalPerPerson = (expense) => {
        return expense.totalAmount / expense.participants.length;
    };

    const renderExpenseItem = ({ item }) => {
        const amountPerPerson = calculateTotalPerPerson(item);
        const isPaidByMe = item.paidBy === currentUserId;

        return (
            <TouchableOpacity
                style={[
                    styles.expenseCard,
                    { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }
                ]}
                onPress={() => onPressExpense(item)}
            >
                <View style={styles.expenseHeader}>
                    <Text style={[
                        styles.expenseTitle,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        {item.description}
                    </Text>
                    <Text style={[
                        styles.expenseAmount,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        ${item.totalAmount.toFixed(2)}
                    </Text>
                </View>

                <View style={styles.expenseDetails}>
                    <Text style={[
                        styles.expenseInfo,
                        { color: isDarkMode ? '#ccc' : '#666' }
                    ]}>
                        {isPaidByMe ? 'Pagado por ti' : `Pagado por ${item.paidByName}`}
                    </Text>
                    <Text style={[
                        styles.expenseInfo,
                        { color: isDarkMode ? '#ccc' : '#666' }
                    ]}>
                        ${amountPerPerson.toFixed(2)} por persona
                    </Text>
                </View>

                <View style={styles.expenseFooter}>
                    <Text style={[
                        styles.expenseDate,
                        { color: isDarkMode ? '#999' : '#666' }
                    ]}>
                        {new Date(item.date).toLocaleDateString()}
                    </Text>
                    <View style={styles.participantsInfo}>
                        <Ionicons 
                            name="people-outline" 
                            size={16} 
                            color={isDarkMode ? '#999' : '#666'} 
                        />
                        <Text style={[
                            styles.participantsCount,
                            { color: isDarkMode ? '#999' : '#666' }
                        ]}>
                            {item.participants.length}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={[
                        styles.emptyText,
                        { color: isDarkMode ? '#fff' : '#000' }
                    ]}>
                        No hay gastos registrados
                    </Text>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    expenseCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    expenseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    expenseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
        fontFamily: 'Inter-Bold',
    },
    expenseAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Inter-Bold',
    },
    expenseDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    expenseInfo: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
    expenseFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expenseDate: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
    },
    participantsInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    participantsCount: {
        fontSize: 12,
        marginLeft: 4,
        fontFamily: 'Inter-Regular',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
    },
});