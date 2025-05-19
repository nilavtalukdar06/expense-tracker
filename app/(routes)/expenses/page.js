import Navbar from "@/app/navbar";
import ExpenseTable from "@/components/expense-table";

export default function ExpensesPage() {
  return (
    <section>
      <Navbar />
      <div className="p-4 w-full text-center">
        <h1 className="text-xl sm:text-2xl text-slate-600 font-medium">
          Expenses
        </h1>
        <p className="max-w-lg mx-auto my-1 text-gray-500 text-sm">
          All of your expenses till now
        </p>
      </div>
      <div className="max-w-3xl mx-auto my-5">
        <ExpenseTable />
      </div>
    </section>
  );
}
