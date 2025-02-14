"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardCard } from "./dashboard-card";

const chartData = [
  { day: "Monday", transactions: 3 },
  { day: "Tuesday", transactions: 5 },
  { day: "Wednesday", transactions: 1 },
  { day: "Thursday", transactions: 6 },
  { day: "Friday", transactions: 2 },
  { day: "Saturday", transactions: 4 },
  { day: "Sunday", transactions: 8 },
];

const chartConfig = {
  monday: {
    label: "Monday"
  },
  tuesday: {
    label: "Tuesday"
  },
  wednesday: {
    label: "Wednesday"
  },
  thursday: {
    label: "Thursday"
  },
  friday: {
    label: "Friday"
  },
  saturday: {
    label: "Saturday"
  },
  sunday: {
    label: "Sunday"
  },
  transactions: {
    label: "Transactions"
  }
} satisfies ChartConfig;

export const OutcomesCard = () => {
  return (
    <DashboardCard
      title="Total outcome"
      description="Total outcome from selected card for last week"
    >
      <ChartContainer config={chartConfig}>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar dataKey="transactions" fill="#39ff78" radius={4} />
        </BarChart>
      </ChartContainer>
    </DashboardCard>
  );
};
