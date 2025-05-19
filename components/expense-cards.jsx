import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ExpenseCards({
  highestExpense,
  latestExpense,
  totalExpense,
  avarageExpense,
}) {
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
