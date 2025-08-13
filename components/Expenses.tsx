import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Expense, getExpenses } from '../services/expenses';

type ExpensesProps = {
  limit?: number;
};

export default function Expenses({ limit }: ExpensesProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getExpenses(limit);
      setExpenses(data);
      setLoading(false);
    };

    fetchData();
  }, [limit]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando gastos...</Text>
      </View>
    );
  }

  if (expenses.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No hay gastos registrados</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {limit ? `Últimos ${limit} gastos` : 'Todos los gastos'}
      </Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.title}</Text>
            <Text>Total: ${item.totalAmount}</Text>
            <Text>Pagó: {item.payer}</Text>
            <Text>Debe: {item.debtor}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  }
});
