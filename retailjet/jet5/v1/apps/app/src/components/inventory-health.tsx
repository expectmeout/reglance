"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
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
interface ProductStock {
  product: string;
  stock: number;
  fill: string;
}

// Sample data
const inventoryData: ProductStock[] = [
  { product: "Product A", stock: 85, fill: "var(--color-product-a)" },
  { product: "Product B", stock: 120, fill: "var(--color-product-b)" },
  { product: "Product C", stock: 45, fill: "var(--color-product-c)" },
  { product: "Product D", stock: 30, fill: "var(--color-product-d)" },
  { product: "Product E", stock: 65, fill: "var(--color-product-e)" },
]

const chartConfig = {
  stock: {
    label: "Stock Level",
  },
  "product-a": {
    label: "Product A",
    color: "hsl(var(--chart-1))",
  },
  "product-b": {
    label: "Product B",
    color: "hsl(var(--chart-2))",
  },
  "product-c": {
    label: "Product C",
    color: "hsl(var(--chart-3))",
  },
  "product-d": {
    label: "Product D",
    color: "hsl(var(--chart-4))",
  },
  "product-e": {
    label: "Product E",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function InventoryHealthChart(): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Health</CardTitle>
        <CardDescription>Current vs Optimal levels</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={inventoryData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="product"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <XAxis dataKey="stock" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="stock" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing inventory levels across all warehouses
        </div>
      </CardFooter>
    </Card>
  )
}