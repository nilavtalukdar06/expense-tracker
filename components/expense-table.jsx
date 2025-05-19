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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ExpenseTable() {
  const session = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const expensesPerPage = 10;

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

  const deleteExpense = async (expense_id) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", expense_id);
      if (error) {
        throw new Error(error.message);
      }
      setExpenses(expenses.filter((expense) => expense.id !== expense_id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete expense");
    }
  };

  useEffect(() => {
    session?.user?.id && fetchExpenses();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(expenses.length / expensesPerPage);
  const startIdx = (currentPage - 1) * expensesPerPage;
  const endIdx = startIdx + expensesPerPage;
  const currentExpenses = expenses.slice(startIdx, endIdx);

  return (
    <section>
      {isLoading ? (
        <div className="w-full my-10 flex justify-center items-center">
          <FadeLoader />
        </div>
      ) : (
        <>
          <Table>
            <TableCaption>A list of your recent expenses.</TableCaption>
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
              {currentExpenses.map((expense, index) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">
                    {startIdx + index + 1}
                  </TableCell>
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your expense and remove it from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-700"
                            onClick={() => deleteExpense(expense.id)}
                          >
                            Delete ☠️
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
