import {
    addDoc,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";

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

// Conseguir todos los gastos
export const getAllExpenses = async (): Promise<Expense[]> => {
  const snapshot = await getDocs(collection(db, EXPENSES_COLLECTION));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Expense[];
};

// Conseguir los ultimos X gastos
export const getLastExpenses = async (max: number): Promise<Expense[]> => {
  const q = query(
    collection(db, EXPENSES_COLLECTION),
    orderBy("date", "desc"),
    limit(max)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Expense[];
};

// Crear un gasto
export const createExpense = async (expense: Expense) => {
  await addDoc(collection(db, EXPENSES_COLLECTION), {
    ...expense,
    date:
      expense.date instanceof Date ? expense.date.toISOString() : expense.date,
    createdAt: Timestamp.now(),
  });
};
