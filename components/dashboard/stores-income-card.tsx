"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "Grocery shop", income: 275, fill: "#f367f8" },
  { browser: "Mobile store", income: 200, fill: "#d65a6f" },
  { browser: "Games store", income: 287, fill: "#b68dff" },
  { browser: "Computer store", income: 173, fill: "#a65fff" },
]

const chartConfig = {
  income: {
    label: "Income",
  },
  chrome: {
    label: "Chrome",
    color: "#f367f8",
  },
  safari: {
    label: "Safari",
    color: "#d65a6f",
  },
  firefox: {
    label: "Firefox",
    color: "#b68dff",
  },
  edge: {
    label: "Edge",
    color: "#a65fff",
  },
  other: {
    label: "Other",
    color: "#c65ff8",
  },
} satisfies ChartConfig

export function StoresIncomeCard() {
  const totalIncome = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.income, 0)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total income</CardTitle>
        <CardDescription>Income from your stores for all time</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
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
      </CardContent>
    </Card>
  )
}
