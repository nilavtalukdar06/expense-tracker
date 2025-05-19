"use client";
import { Plus } from "lucide-react";
import supabase from "@/supabase/supabase";
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
import { useState } from "react";
import Spinner from "./ui/spinner";
import toast from "react-hot-toast";

export default function AddExpense() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const submitData = async () => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("expenses").insert(formData);
      if (error) {
        throw new Error(error.message);
      }
      setOpen(false);
      setFormData({ ...formData, amount: "", category: "", description: "" });
      toast.success("Expense added");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
  };

  return (
    <Dialog className="my-2" open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-[#3fcf8e] border-[#34b27b] hover:bg-[#34b27b] flex gap-x-2 items-center justify-center px-3 py-2 rounded text-white cursor-pointer">
        <span>Add Expense</span>
        <Plus />
      </DialogTrigger>
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
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-y-1 space-y-2">
                <Label htmlFor="description">Enter description</Label>
                <Textarea
                  placeholder="Enter Description"
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="my-2 border-t border-slate-300 border-dashed" />
              <Button
                className="bg-[#3fcf8e] border-[#34b27b] hover:bg-[#34b27b] w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex gap-x-2 items-center justify-center">
                    Adding...
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
  );
}
