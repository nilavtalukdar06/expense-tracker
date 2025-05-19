"use client";
import { Plus, Sparkles } from "lucide-react";
import supabase from "@/supabase/supabase";
import ExpenseCards from "./expense-cards";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState, useEffect, useContext } from "react";
import Spinner from "./ui/spinner";
import toast from "react-hot-toast";
import SessionContext from "@/context/session-context";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function AddExpense() {
  const session = useContext(SessionContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [avarageExpense, setAvarageExpense] = useState(0);
  const [highestExpense, setHighestExpense] = useState(0);
  const [latestExpense, setLatestExpense] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

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
      const expenses = data.map((expense) => expense.amount);
      const sum = expenses.reduce((acc, curr) => acc + curr, 0);
      setTotalExpense(sum);
      if (!isNaN((sum / expenses.length).toFixed(2))) {
        setAvarageExpense((sum / expenses.length).toFixed(2));
      } else {
        setAvarageExpense(0);
      }

      if (expenses.length !== 0) {
        setHighestExpense(Math.max(...expenses));
      } else {
        setHighestExpense(0);
      }
      if (expenses[expenses.length - 1]) {
        setLatestExpense(expenses[expenses.length - 1]);
      } else {
        setLatestExpense(0);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch expenses");
    } finally {
      setIsLoading(false);
    }
  };

  const submitData = async () => {
    try {
      setIsSubmitting(true);
      if (!formData.amount || !formData.category || !formData.description) {
        toast.error("Complete the form");
        return;
      }
      const { error } = await supabase.from("expenses").insert(formData);
      if (error) {
        throw new Error(error.message);
      }
      setOpen(false);
      fetchExpenses();
      setFormData({ ...formData, amount: "", category: "", description: "" });
      toast.success("Expense added");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateContent = async () => {
    try {
      setIsGenerating(true);
      if (!formData.amount || !formData.category) {
        toast.error("Enter amount and category");
        return;
      }
      const response = await fetch("/api/generate-content", {
        method: "POST",
        body: JSON.stringify({
          amount: formData.amount,
          category: formData.category,
        }),
      });
      if (!response.ok) {
        throw new Error(`failed to generate content ${response.status}`);
      }
      const result = await response.json();
      setFormData({ ...formData, description: result.message });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const aiInsight = async () => {
    try {
      const response = await fetch("/api/generate-insight", {
        method: "POST",
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate ai insights");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
  };

  useEffect(() => {
    session?.user?.id && fetchExpenses();
  }, []);

  return (
    <section>
      <Dialog className="my-2" open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-[#3fcf8e] border-[#34b27b] hover:bg-[#34b27b] flex gap-x-2 items-center justify-center px-3 py-2 rounded text-white cursor-pointer">
          <span>Add Expense</span>
          <Plus />
        </DialogTrigger>
        <Card className="my-4 w-full md:max-w-2xl">
          <CardHeader>
            <CardTitle>Ai Insights ✨</CardTitle>
            <CardDescription>
              The sun dipped below the horizon, casting golden hues across the
              tranquil lake. Birds sang softly in the distance while a gentle
              breeze rustled the leaves. Nearby, children laughed and played,
              unaware of the peaceful magic filling the air as twilight slowly
              embraced the world in calm serenity.
            </CardDescription>
          </CardHeader>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col">
              <span>Add Expense</span>
              <span className="my-1 text-sm text-gray-500 tracking-tight">
                Save your expense to our database
              </span>
            </DialogTitle>
            <div className="my-4">
              <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-1 space-y-2">
                  <Label htmlFor="amount">Enter amount</Label>
                  <Input
                    placeholder="Enter amount"
                    type="number"
                    id="amount"
                    value={formData.amount}
                    disabled={isSubmitting || isGenerating}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    name="amount"
                    className="space-y-2"
                  />
                </div>
                <div className="flex flex-col gap-y-1 space-y-2">
                  <Label htmlFor="category">Select a category</Label>
                  <Select
                    id="category"
                    value={formData.category}
                    disabled={isSubmitting || isGenerating}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-y-1 space-y-2">
                  <Label htmlFor="description">Enter description</Label>
                  <div className="relative w-full h-fit">
                    <Textarea
                      placeholder="Enter Description"
                      id="description"
                      disabled={isSubmitting || isGenerating}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 absolute transition-colors cursor-pointer right-2 bottom-2 z-20"
                      type="button"
                      disabled={isGenerating || isSubmitting}
                      onClick={generateContent}
                    >
                      <Sparkles size={18} />
                    </button>
                  </div>
                </div>
                <Button
                  className="bg-[#3fcf8e] border-[#34b27b] hover:bg-[#34b27b] w-full"
                  type="submit"
                  disabled={isSubmitting || isGenerating}
                >
                  {isSubmitting ? (
                    <span className="flex gap-x-2 items-center justify-center">
                      Adding...
                      <Spinner />
                    </span>
                  ) : isGenerating ? (
                    <span className="flex gap-x-2 items-center justify-center">
                      Generating with AI...
                      <Spinner />
                    </span>
                  ) : (
                    "Add Expense"
                  )}
                </Button>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="my-6 max-w-screen">
        <ExpenseCards
          highestExpense={highestExpense}
          avarageExpense={avarageExpense}
          totalExpense={totalExpense}
          latestExpense={latestExpense}
          loading={loading}
          expenses={expenses}
        />
      </div>
    </section>
  );
}
