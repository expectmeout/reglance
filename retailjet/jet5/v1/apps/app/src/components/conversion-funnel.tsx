"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, Cell } from "recharts"
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

// Sample data - using actual percentages for better visualization
const funnelData = [
  { 
    name: "Impressions",
    value: 100,
    fill: "hsl(var(--chart-1))"
  },
  { 
    name: "Clicks",
    value: 28,
    fill: "hsl(var(--chart-2))"
  },
  { 
    name: "Add to Cart",
    value: 15,
    fill: "hsl(var(--chart-3))"
  },
  { 
    name: "Purchases",
    value: 8,
    fill: "hsl(var(--chart-4))"
  }
];

const chartConfig = {
  value: {
    label: "Conversion Rate",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ConversionFunnelChart(): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>
          Percentage at each stage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <BarChart 
              layout="vertical" 
              data={funnelData}
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" />
              <Tooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    formatter={(value) => `${value}%`}
                  />
                }
              />
              <Bar
                dataKey="value"
                fill="currentColor"
                radius={[0, 4, 4, 0]}
                className="fill-primary"
              >
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}