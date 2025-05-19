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
  { browser: "chrome", visitors: 275, fill: "hsl(173, 58%, 39%)" },
  { browser: "safari", visitors: 200, fill: "hsl(12, 76%, 61%)" },
  { browser: "firefox", visitors: 187, fill: "hsl(197, 37%, 24%)" },
  { browser: "edge", visitors: 173, fill: "hsl(43, 74%, 66%)" },
  { browser: "other", visitors: 90, fill: "hsl(27, 87%, 67%)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(173, 58%, 39%)",
  },
  safari: {
    label: "Safari",
    color: "hsl(12, 76%, 61%)",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(197, 37%, 24%)",
  },
  edge: {
    label: "Edge",
    color: "hsl(43, 74%, 66%)",
  },
  other: {
    label: "Other",
    color: "hsl(27, 87%, 67%)",
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
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <YAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
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
