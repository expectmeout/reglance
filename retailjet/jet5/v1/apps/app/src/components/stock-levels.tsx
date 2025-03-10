"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/chart"

// Define types
interface StockData {
  month: string;
  amazon: number;
  walmart: number;
  shopify: number;
}

// Sample data
const stockData: StockData[] = [
  { month: "January", amazon: 92, walmart: 88, shopify: 95 },
  { month: "February", amazon: 90, walmart: 85, shopify: 94 },
  { month: "March", amazon: 88, walmart: 82, shopify: 91 },
  { month: "April", amazon: 85, walmart: 80, shopify: 90 },
  { month: "May", amazon: 87, walmart: 83, shopify: 92 },
  { month: "June", amazon: 90, walmart: 86, shopify: 94 },
]

const chartConfig = {
  amazon: {
    label: "Amazon",
    color: "hsl(var(--chart-1))",
  },
  walmart: {
    label: "Walmart",
    color: "hsl(var(--chart-3))",
  },
  shopify: {
    label: "Shopify",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function StockLevelsChart(): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Levels by Marketplace</CardTitle>
        <CardDescription>
          Percentage of products in stock
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={stockData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillAmazon" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-amazon)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-amazon)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillWalmart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-walmart)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-walmart)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillShopify" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-shopify)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-shopify)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="walmart"
              type="natural"
              fill="url(#fillWalmart)"
              fillOpacity={0.4}
              stroke="var(--color-walmart)"
              stackId="a"
            />
            <Area
              dataKey="shopify"
              type="natural"
              fill="url(#fillShopify)"
              fillOpacity={0.4}
              stroke="var(--color-shopify)"
              stackId="a"
            />
            <Area
              dataKey="amazon"
              type="natural"
              fill="url(#fillAmazon)"
              fillOpacity={0.4}
              stroke="var(--color-amazon)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 1.7% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}