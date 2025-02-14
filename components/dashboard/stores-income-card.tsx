"use client"

  import * as React from "react"
  import { Label, Pie, PieChart } from "recharts"

  import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
  import { DashboardCard } from "./dashboard-card"
  const chartData = [
  { store: "Grocery shop", income: 275, fill: "#f367f8" },
  { store: "Mobile store", income: 200, fill: "#d65a6f" },
  { store: "Games store", income: 287, fill: "#b68dff" },
  { store: "Computer store", income: 173, fill: "#a65fff" },
]

const chartConfig = {
  income: {
    label: "Income",
  },
  "Grocery shop": {
    label: "Grocery shop",
    color: "#f367f8",
  },
  "Mobile store": {
    label: "Mobile store",
    color: "#d65a6f",
  },
  "Games store": {
    label: "Games store",
    color: "#b68dff",
  },
  "Computer store": {
    label: "Computer store",
    color: "#a65fff",
  },
} satisfies ChartConfig

export function StoresIncomeCard() {
  const totalIncome = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.income, 0)
  }, [])

  return (
    <DashboardCard title="Total income" description="Income from your stores for all time">
      <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="income"
              nameKey="browser"
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
                          {totalIncome.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Income
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
    </DashboardCard>
  )
}
