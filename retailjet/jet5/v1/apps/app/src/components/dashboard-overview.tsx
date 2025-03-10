"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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

// 6 months of marketplace sales data
const chartData = [
  { month: "January", amazon: 106000, walmart: 90000, shopify: 50000 },
  { month: "February", amazon: 180000, walmart: 144000, shopify: 96000 },
  { month: "March", amazon: 187000, walmart: 115000, shopify: 130000 },
  { month: "April", amazon: 133000, walmart: 125000, shopify: 85000 },
  { month: "May", amazon: 192000, walmart: 138000, shopify: 140200 },
  { month: "June", amazon: 204000, walmart: 172000, shopify: 194000 }
]

// Total sales calculation
const totalSales = chartData.reduce(
  (sum, month) => sum + month.amazon + month.walmart + month.shopify, 
  0
);

const chartConfig = {
  amazon: {
    label: "Amazon",
    color: "hsl(var(--chart-1))",
  },
  walmart: {
    label: "Walmart",
    color: "hsl(var(--chart-3))", // Orange
  },
  shopify: {
    label: "Shopify",
    color: "hsl(var(--chart-2))", // Green
  },
} satisfies ChartConfig

export function SalesOverview() {
  // Calculate growth percentage
  const lastMonth = chartData[chartData.length - 1];
  const prevMonth = chartData[chartData.length - 2];
  const totalLastMonth = lastMonth.amazon + lastMonth.walmart + lastMonth.shopify;
  const totalPrevMonth = prevMonth.amazon + prevMonth.walmart + prevMonth.shopify;
  const growthPercent = ((totalLastMonth - totalPrevMonth) / totalPrevMonth * 100).toFixed(1);

  return (
    <Card className="col-span-4 h-[360px] sm:h-[340px] md:h-[420px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Marketplace Sales Overview</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-sm font-medium">
            <span>+{growthPercent}%</span>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-xs text-muted-foreground">
            ${(totalSales/1000000).toFixed(2)}M in total sales
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-5rem)]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="amazon" fill="var(--color-amazon)" radius={4} />
            <Bar dataKey="walmart" fill="var(--color-walmart)" radius={4} />
            <Bar dataKey="shopify" fill="var(--color-shopify)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}