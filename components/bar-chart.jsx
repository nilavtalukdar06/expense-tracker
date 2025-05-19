"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { category: "food", amount: 275, fill: "hsl(173, 58%, 39%)" },
  { category: "transportation", amount: 200, fill: "hsl(12, 76%, 61%)" },
  { category: "housing", amount: 187, fill: "hsl(197, 37%, 24%)" },
  { category: "entertainment", amount: 173, fill: "hsl(43, 74%, 66%)" },
  { category: "shopping", amount: 90, fill: "hsl(27, 87%, 67%)" },
  { category: "health", amount: 90, fill: "hsl(173, 58%, 39%)" },
  { category: "other", amount: 90, fill: "hsl(43, 74%, 66%)" },
];

const chartConfig = {
  amount: {
    label: "Amount",
  },
  food: {
    label: "Food",
    color: "hsl(173, 58%, 39%)",
  },
  transportation: {
    label: "Transport",
    color: "hsl(12, 76%, 61%)",
  },
  housing: {
    label: "Housing",
    color: "hsl(197, 37%, 24%)",
  },
  entertainment: {
    label: "Movies",
    color: "hsl(43, 74%, 66%)",
  },
  shopping: {
    label: "Shopping",
    color: "hsl(27, 87%, 67%)",
  },
  health: {
    label: "Health",
    color: "hsl(173, 58%, 39%)",
  },
  other: {
    label: "Other",
    color: "hsl(43, 74%, 66%)",
  },
};

export default function BarChartComponent() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="horizontal"
            margin={{
              left: 0,
            }}
          >
            <XAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <YAxis dataKey="amount" type="number" hide />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="amount"
              layout="vertical"
              radius={5}
              fill={({ payload }) => payload.fill}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
