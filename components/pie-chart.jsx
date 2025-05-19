"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

export function PieChartComponent({ expenses }) {
  // Group expenses by category and sum the amounts
  const chartData = React.useMemo(() => {
    if (!expenses) return [];
    return expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      const found = acc.find((item) => item.category === category);
      if (found) {
        found.amount += amount;
      } else {
        acc.push({
          category,
          amount,
          fill: chartConfig[category]?.color || "hsl(0,0%,80%)",
        });
      }
      return acc;
    }, []);
  }, [expenses]);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Amount
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
