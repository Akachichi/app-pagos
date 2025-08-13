import {
  addDoc,
  collection,
  getDocs,
  limit as limitQuery,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const EXPENSES_COLLECTION = "expenses";

// Tipo de dato para TypeScript
export type Expense = {
  id?: string;
  title: string;
  type: "installments" | "split";
  totalAmount: number;
  currency: string;
  payer: string;
  debtor: string[];
  installmentCount?: number;
  installmentValue?: number;
  date: string | Date;
};

// Función unificada para obtener gastos
export const getExpenses = async (limit?: number): Promise<Expense[]> => {
  const collectionRef = collection(db, EXPENSES_COLLECTION);

  const q = limit
    ? query(collectionRef, orderBy('date', 'desc'), limitQuery(limit))
    : query(collectionRef, orderBy('date', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Expense[];
}

// Crear un gasto
export const createExpense = async (expense: Expense) => {
  await addDoc(collection(db, EXPENSES_COLLECTION), {
    ...expense,
    date:
      expense.date instanceof Date ? expense.date.toISOString() : expense.date,
    createdAt: Timestamp.now(),
  });
};
