import AddExpense from "@/components/add-expense";
import Navbar from "./navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <section>
      <Navbar />
      <div className="w-full p-4">
        <h1 className="text-xl sm:text-2xl text-slate-600 font-medium">
          Expensify
        </h1>
        <p className="max-w-lg my-1 text-gray-500 text-sm">
          Add and manage your expenses at one place
        </p>
        <AddExpense />
      </div>
      <Footer />
    </section>
  );
}
