import AsyncStorage from '@react-native-async-storage/async-storage';

const users = [
    {
        id: "user1",
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "123456", // En producción usar hash
        profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
        preferences: {
            currency: "USD",
            language: "es",
            notifications: true
        }
    },
    {
        id: "user2",
        name: "María García",
        email: "maria@example.com",
        password: "123456",
        profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
        preferences: {
            currency: "USD",
            language: "es",
            notifications: true
        }
    }
];

const trips = [
    {
        id: "trip1",
        name: "Viaje a la Playa",
        description: "Vacaciones de verano en Viña del Mar",
        startDate: "2024-01-15T00:00:00.000Z",
        endDate: "2024-01-22T00:00:00.000Z",
        createdBy: "user1",
        participants: ["user1", "user2"],
        code: "ABC123",
        expenses: [
            {
                id: "exp1",
                description: "Hotel",
                amount: 300,
                currency: "USD",
                paidBy: "user1",
                date: "2024-01-15T14:00:00.000Z",
                category: "Alojamiento",
                splitBetween: ["user1", "user2"],
                receipts: []
            },
            {
                id: "exp2",
                description: "Cena restaurante",
                amount: 80,
                currency: "USD",
                paidBy: "user2",
                date: "2024-01-16T20:00:00.000Z",
                category: "Comida",
                splitBetween: ["user1", "user2"],
                receipts: []
            },
            {
                id: "exp3",
                description: "Taxi aeropuerto",
                amount: 45,
                currency: "USD",
                paidBy: "user1",
                date: "2024-01-15T12:00:00.000Z",
                category: "Transporte",
                splitBetween: ["user1", "user2"],
                receipts: []
            }
        ],
        messages: [
            {
                id: "msg1",
                text: "¡Ya reservé el hotel!",
                userId: "user1",
                timestamp: "2024-01-10T15:30:00.000Z"
            },
            {
                id: "msg2",
                text: "Perfecto, yo me encargo del transporte",
                userId: "user2",
                timestamp: "2024-01-10T15:35:00.000Z"
            }
        ]
    },
    {
        id: "trip2",
        name: "Viaje a Santiago",
        description: "Fin de semana en la capital",
        startDate: "2024-02-01T00:00:00.000Z",
        endDate: "2024-02-03T00:00:00.000Z",
        createdBy: "user2",
        participants: ["user1", "user2"],
        code: "XYZ789",
        expenses: [
            {
                id: "exp4",
                description: "Airbnb",
                amount: 150,
                currency: "USD",
                paidBy: "user2",
                date: "2024-02-01T15:00:00.000Z",
                category: "Alojamiento",
                splitBetween: ["user1", "user2"],
                receipts: []
            },
            {
                id: "exp5",
                description: "Supermercado",
                amount: 60,
                currency: "USD",
                paidBy: "user1",
                date: "2024-02-02T11:00:00.000Z",
                category: "Comida",
                splitBetween: ["user1", "user2"],
                receipts: []
            }
        ],
        messages: [
            {
                id: "msg3",
                text: "¿A qué hora llegamos?",
                userId: "user1",
                timestamp: "2024-01-28T18:00:00.000Z"
            }
        ]
    }
];

export const loadSeeds = async () => {
    try {
        // Limpiar datos existentes
        await AsyncStorage.clear();

        // Guardar usuarios
        await AsyncStorage.setItem('users', JSON.stringify(users));
        
        // Guardar viajes
        await AsyncStorage.setItem('trips', JSON.stringify(trips));

        // Guardar usuario actual (para pruebas)
        await AsyncStorage.setItem('user', JSON.stringify(users[0]));

        console.log('Seeds cargados exitosamente');
        return true;
    } catch (error) {
        console.error('Error cargando seeds:', error);
        return false;
    }
};

// Función auxiliar para obtener balances
export const getBalances = (trip) => {
    const balances = {};
    trip.participants.forEach(userId => {
        balances[userId] = 0;
    });

    trip.expenses.forEach(expense => {
        const paidBy = expense.paidBy;
        const amount = expense.amount;
        const splitBetween = expense.splitBetween;
        const splitAmount = amount / splitBetween.length;

        // Sumar al que pagó
        balances[paidBy] += amount;

        // Restar a los que deben
        splitBetween.forEach(userId => {
            balances[userId] -= splitAmount;
        });
    });

    return balances;
};