"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/chart"

// Updated mock data for platform traffic
const chartData = [
  { date: "2024-04-01", amazon: 220, walmart: 90, shopify: 62 },
  { date: "2024-04-02", amazon: 158, walmart: 74, shopify: 45 },
  { date: "2024-04-03", amazon: 165, walmart: 82, shopify: 40 },
  { date: "2024-04-04", amazon: 290, walmart: 130, shopify: 82 },
  { date: "2024-04-05", amazon: 380, walmart: 178, shopify: 105 },
  { date: "2024-04-06", amazon: 365, walmart: 185, shopify: 91 },
  { date: "2024-04-07", amazon: 245, walmart: 115, shopify: 65 },
  { date: "2024-04-08", amazon: 420, walmart: 192, shopify: 117 },
  { date: "2024-04-09", amazon: 105, walmart: 42, shopify: 22 },
  { date: "2024-04-10", amazon: 258, walmart: 128, shopify: 65 },
  { date: "2024-04-11", amazon: 385, walmart: 195, shopify: 97 },
  { date: "2024-04-12", amazon: 288, walmart: 142, shopify: 72 },
  { date: "2024-04-13", amazon: 415, walmart: 205, shopify: 102 },
  { date: "2024-04-14", amazon: 210, walmart: 98, shopify: 49 },
  { date: "2024-04-15", amazon: 168, walmart: 82, shopify: 40 },
  { date: "2024-04-16", amazon: 190, walmart: 88, shopify: 50 },
  { date: "2024-04-17", amazon: 465, walmart: 225, shopify: 116 },
  { date: "2024-04-18", amazon: 445, walmart: 210, shopify: 119 },
  { date: "2024-04-19", amazon: 245, walmart: 115, shopify: 63 },
  { date: "2024-04-20", amazon: 138, walmart: 65, shopify: 36 },
  { date: "2024-04-21", amazon: 195, walmart: 92, shopify: 50 },
  { date: "2024-04-22", amazon: 228, walmart: 108, shopify: 58 },
  { date: "2024-04-23", amazon: 215, walmart: 102, shopify: 51 },
  { date: "2024-04-24", amazon: 390, walmart: 185, shopify: 102 },
  { date: "2024-04-25", amazon: 268, walmart: 128, shopify: 69 },
  { date: "2024-04-26", amazon: 118, walmart: 55, shopify: 32 },
  { date: "2024-04-27", amazon: 462, walmart: 220, shopify: 121 },
  { date: "2024-04-28", amazon: 174, walmart: 82, shopify: 46 },
  { date: "2024-04-29", amazon: 318, walmart: 152, shopify: 85 },
  { date: "2024-04-30", amazon: 480, walmart: 235, shopify: 119 },
  { date: "2024-05-01", amazon: 222, walmart: 105, shopify: 58 },
  { date: "2024-05-02", amazon: 348, walmart: 165, shopify: 90 },
  { date: "2024-05-03", amazon: 252, walmart: 120, shopify: 65 },
  { date: "2024-05-04", amazon: 465, walmart: 218, shopify: 122 },
  { date: "2024-05-05", amazon: 498, walmart: 242, shopify: 131 },
  { date: "2024-05-06", amazon: 588, walmart: 280, shopify: 150 },
  { date: "2024-05-07", amazon: 395, walmart: 188, shopify: 105 },
  { date: "2024-05-08", amazon: 208, walmart: 98, shopify: 53 },
  { date: "2024-05-09", amazon: 235, walmart: 112, shopify: 60 },
  { date: "2024-05-10", amazon: 360, walmart: 170, shopify: 93 },
  { date: "2024-05-11", amazon: 348, walmart: 165, shopify: 92 },
  { date: "2024-05-12", amazon: 255, walmart: 120, shopify: 62 },
  { date: "2024-05-13", amazon: 205, walmart: 98, shopify: 54 },
  { date: "2024-05-14", amazon: 542, walmart: 258, shopify: 138 },
  { date: "2024-05-15", amazon: 490, walmart: 235, shopify: 128 },
  { date: "2024-05-16", amazon: 425, walmart: 205, shopify: 108 },
  { date: "2024-05-17", amazon: 530, walmart: 252, shopify: 137 },
  { date: "2024-05-18", amazon: 385, walmart: 182, shopify: 98 },
  { date: "2024-05-19", amazon: 240, walmart: 115, shopify: 60 },
  { date: "2024-05-20", amazon: 235, walmart: 112, shopify: 60 },
  { date: "2024-05-21", amazon: 128, walmart: 62, shopify: 32 },
  { date: "2024-05-22", amazon: 116, walmart: 55, shopify: 30 },
  { date: "2024-05-23", amazon: 312, walmart: 148, shopify: 82 },
  { date: "2024-05-24", amazon: 295, walmart: 140, shopify: 79 },
  { date: "2024-05-25", amazon: 260, walmart: 125, shopify: 66 },
  { date: "2024-05-26", amazon: 222, walmart: 105, shopify: 56 },
  { date: "2024-05-27", amazon: 510, walmart: 242, shopify: 128 },
  { date: "2024-05-28", amazon: 242, walmart: 115, shopify: 66 },
  { date: "2024-05-29", amazon: 120, walmart: 57, shopify: 31 },
  { date: "2024-05-30", amazon: 358, walmart: 170, shopify: 92 },
  { date: "2024-05-31", amazon: 235, walmart: 112, shopify: 61 },
  { date: "2024-06-01", amazon: 218, walmart: 105, shopify: 55 },
  { date: "2024-06-02", amazon: 508, walmart: 240, shopify: 132 },
  { date: "2024-06-03", amazon: 152, walmart: 72, shopify: 39 },
  { date: "2024-06-04", amazon: 472, walmart: 225, shopify: 122 },
  { date: "2024-06-05", amazon: 132, walmart: 62, shopify: 34 },
  { date: "2024-06-06", amazon: 312, walmart: 148, shopify: 84 },
  { date: "2024-06-07", amazon: 398, walmart: 190, shopify: 105 },
  { date: "2024-06-08", amazon: 408, walmart: 192, shopify: 105 },
  { date: "2024-06-09", amazon: 530, walmart: 252, shopify: 136 },
  { date: "2024-06-10", amazon: 205, walmart: 98, shopify: 52 },
  { date: "2024-06-11", amazon: 140, walmart: 68, shopify: 34 },
  { date: "2024-06-12", amazon: 526, walmart: 252, shopify: 134 },
  { date: "2024-06-13", amazon: 123, walmart: 58, shopify: 30 },
  { date: "2024-06-14", amazon: 465, walmart: 222, shopify: 119 },
  { date: "2024-06-15", amazon: 380, walmart: 180, shopify: 97 },
  { date: "2024-06-16", amazon: 392, walmart: 188, shopify: 101 },
  { date: "2024-06-17", amazon: 572, walmart: 272, shopify: 151 },
  { date: "2024-06-18", amazon: 160, walmart: 77, shopify: 40 },
  { date: "2024-06-19", amazon: 362, walmart: 172, shopify: 97 },
  { date: "2024-06-20", amazon: 495, walmart: 235, shopify: 128 },
  { date: "2024-06-21", amazon: 218, walmart: 105, shopify: 56 },
  { date: "2024-06-22", amazon: 338, walmart: 162, shopify: 87 },
  { date: "2024-06-23", amazon: 583, walmart: 278, shopify: 149 },
  { date: "2024-06-24", amazon: 180, walmart: 85, shopify: 47 },
  { date: "2024-06-25", amazon: 190, walmart: 90, shopify: 51 },
  { date: "2024-06-26", amazon: 469, walmart: 225, shopify: 120 },
  { date: "2024-06-27", amazon: 542, walmart: 258, shopify: 138 },
  { date: "2024-06-28", amazon: 202, walmart: 97, shopify: 50 },
  { date: "2024-06-29", amazon: 152, walmart: 72, shopify: 39 },
  { date: "2024-06-30", amazon: 486, walmart: 232, shopify: 128 }
]

// Updated chart configuration for platforms
const chartConfig = {
  views: {
    label: "Page Views",
  },
  amazon: {
    label: "Amazon",
    color: "hsl(var(--chart-1))",
  },
  walmart: {
    label: "Walmart",
    color: "hsl(var(--chart-2))",
  },
  shopify: {
    label: "Shopify",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function ProfitMarginTrend() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("amazon")

  const total = React.useMemo(
    () => ({
      amazon: chartData.reduce((acc, curr) => acc + curr.amazon, 0),
      walmart: chartData.reduce((acc, curr) => acc + curr.walmart, 0),
      shopify: chartData.reduce((acc, curr) => acc + curr.shopify, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["amazon", "walmart", "shopify"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}