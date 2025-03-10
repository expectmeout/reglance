"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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
interface TrafficSource {
  source: string;
  value: number;
  fill: string;
}

// Sample data
const trafficData: TrafficSource[] = [
  { source: "organic", value: 42, fill: "var(--color-organic)" },
  { source: "ppc", value: 28, fill: "var(--color-ppc)" },
  { source: "social", value: 15, fill: "var(--color-social)" },
  { source: "referral", value: 10, fill: "var(--color-referral)" },
  { source: "email", value: 5, fill: "var(--color-email)" },
]

const chartConfig = {
  value: {
    label: "Traffic",
  },
  organic: {
    label: "Organic",
    color: "hsl(var(--chart-1))",
  },
  ppc: {
    label: "PPC",
    color: "hsl(var(--chart-2))",
  },
  social: {
    label: "Social",
    color: "hsl(var(--chart-3))",
  },
  referral: {
    label: "Referral",
    color: "hsl(var(--chart-4))",
  },
  email: {
    label: "Email",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function TrafficSourcesChart(): JSX.Element {
  const totalTraffic = React.useMemo(() => {
    return trafficData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])
  
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>By percentage</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
              data={trafficData}
              dataKey="value"
              nameKey="source"
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
                          {totalTraffic.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visits
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 7.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Organic traffic increased by 12.5%
        </div>
      </CardFooter>
    </Card>
  )
}