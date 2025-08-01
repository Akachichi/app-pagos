import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useExpense } from "@/hooks/useExpenses";

type ExpensesProps = {
  limit?: number;
};

export const Expenses = ({ limit }: ExpensesProps) => {
  const { expenses, loading } = useExpense({limit});

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
      {limit ? (
        <Text style={styles.title}>Últimos {limit} gastos</Text>
      ) : (
        <Text style={styles.title}>Todos los gastos</Text>
      )}
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
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
});
