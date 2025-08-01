import {
    Expense,
    getAllExpenses,
    getLastExpenses,
} from "@/app/services/expenses";
import { useEffect, useState } from "react";

type ExpensesProps = {
  limit?: number;
};

export const useExpense = ({ limit }: ExpensesProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let data: Expense[];

      if (limit && limit > 0) {
        data = await getLastExpenses(limit);
      } else {
        data = await getAllExpenses();
      }
      setExpenses(data);
      setLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    expenses,
    loading,
  };
};
