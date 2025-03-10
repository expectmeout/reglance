"use client"

import { ArrowDownFromLine, ArrowUpFromLine, TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/chart"

const chartData = [
  { metric: "Stock Accuracy", current: 85, target: 95 },
  { metric: "Fill Rate", current: 92, target: 98 },
  { metric: "Order Cycle Time", current: 88, target: 95 },
  { metric: "Inventory Turnover", current: 75, target: 85 },
  { metric: "Perfect Order Rate", current: 82, target: 90 },
]

const chartConfig = {
  current: {
    label: "Current Performance",
    color: "hsl(var(--chart-1))",
    icon: ArrowDownFromLine,
  },
  target: {
    label: "Target Performance",
    color: "hsl(var(--chart-2))",
    icon: ArrowUpFromLine,
  },
} satisfies ChartConfig

export function RadarChartHealth2() {
  return (
    <div className="h-full w-full">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-base font-medium">Inventory Health Metrics</CardTitle>
        <CardDescription>
          Current vs target performance
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: -30,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
            <Radar
              dataKey="current"
              fill="var(--color-current)"
              fillOpacity={0.6}
            />
            <Radar dataKey="target" fill="var(--color-target)" fillOpacity={0.3} />
            <ChartLegend className="mt-4" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 pt-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Overall improvement 3.8% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Q1 2025 Performance
        </div>
      </CardFooter>
    </div>
  )
}