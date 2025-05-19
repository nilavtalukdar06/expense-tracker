"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import supabase from "@/supabase/supabase";
import { useContext, useEffect, useState } from "react";
import SessionContext from "@/context/session-context";
import toast from "react-hot-toast";

export default function ExpenseCards() {
  const session = useContext(SessionContext);
  const [totalExpense, setTotalExpense] = useState(0);
  const [avarageExpense, setAvarageExpense] = useState(0);
  const [highestExpense, setHighestExpense] = useState(0);
  const [latestExpense, setLatestExpense] = useState(0);

  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", session?.user?.id);
      if (error) {
        throw new Error(error.message);
      }
      const expenses = data.map((expense) => expense.amount);
      const sum = expenses.reduce((acc, curr) => acc + curr, 0);
      setTotalExpense(sum);
      setAvarageExpense((sum / expenses.length).toFixed(2));
      setHighestExpense(Math.max(...expenses));
      setLatestExpense(expenses[expenses.length - 1]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch expenses");
    }
  };

  useEffect(() => {
    session?.user?.id && fetchExpenses();
  }, []);

  return (
    <div className="max-w-screen grid sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>All time expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl text-slate-800 font-semibold">
            {totalExpense} &#8377;Rs
          </p>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Average Expense</CardTitle>
          <CardDescription>Per transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl text-slate-800 font-semibold">
            {avarageExpense} &#8377;Rs
          </p>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Highest Expense</CardTitle>
          <CardDescription>Single transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl text-slate-800 font-semibold">
            {highestExpense} &#8377;Rs
          </p>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Latest Expense</CardTitle>
          <CardDescription>Most recent transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl text-slate-800 font-semibold">
            {latestExpense} &#8377;Rs
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
