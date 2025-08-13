import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useExpense } from '@/hooks/useExpenses';

export default function HomeScreen() {
  const {loading} = useExpense({})

  if (loading) {
    return <View>
      <Text style={styles.title}>Estamos cargando esos gastitos PA</Text>
    </View>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la mejor app para los gastos</Text>
      <Text style={styles.subtitle}>Que tenes ganas de hacer?</Text>
      {/* <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.title}</Text>
            <Text>Total: ${item.totalAmount}</Text>
            <Text>Pagó: {item.payer}</Text>
            <Text>Debe: {item.debtor}</Text>
          </View>
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  name: {
    fontSize: 18,
    fontWeight: '600'
  }
});
