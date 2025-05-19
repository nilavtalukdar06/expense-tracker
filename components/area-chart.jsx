"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(173, 58%, 39%)",
  },
};

export default function AreaChartComponent({ expenses }) {
  // Group expenses by category and sum the amounts
  const chartData =
    expenses?.reduce((acc, expense) => {
      const { category, amount } = expense;
      const found = acc.find((item) => item.category === category);
      if (found) {
        found.amount += amount;
      } else {
        acc.push({ category, amount });
      }
      return acc;
    }, []) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="category"
              tickLine={true}
              axisLine={false}
              tick={false}
              tickMargin={14}
            />
            <Tooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="amount"
              type="natural"
              fill="#3fcf8e"
              fillOpacity={0.6}
              stroke="hsl(173, 58%, 39%)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
