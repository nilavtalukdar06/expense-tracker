"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import supabase from "@/supabase/supabase";
import { useContext } from "react";
import SessionContext from "@/context/session-context";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ExpenseTable() {
  const session = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", session?.user?.id);
      if (error) {
        throw new Error(error.message);
      }
      setExpenses(data);
      const result = data.map((expense) => expense.amount);
      const sum = result.reduce((acc, curr) => acc + curr, 0);
      setTotalExpense(sum);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch expenses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    session?.user?.id && fetchExpenses();
  }, []);

  return (
    <section>
      {isLoading ? (
        <div className="w-full my-10 flex justify-center items-center">
          <FadeLoader />
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Serial</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-[#3fcf8e] border-[#34b27b] hover:bg-[#34b27b]">
                        Reveal
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Expense Description</DialogTitle>
                        <DialogDescription>
                          {expense.description}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">
                &#8377;{totalExpense}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </section>
  );
}
