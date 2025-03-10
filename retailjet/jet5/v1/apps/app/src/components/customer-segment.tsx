"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
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
interface SegmentData {
  segment: string;
  value: number;
}

// Sample data
const segmentData: SegmentData[] = [
  { segment: "Acquisition", value: 78 },
  { segment: "Conversion", value: 65 },
  { segment: "Retention", value: 83 },
  { segment: "Revenue", value: 72 },
  { segment: "Satisfaction", value: 80 },
]

const chartConfig = {
  value: {
    label: "Performance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CustomerSegmentChart(): JSX.Element {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Customer Segment Performance</CardTitle>
        <CardDescription>
          Key performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={segmentData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-[--color-value] opacity-20" />
            <PolarAngleAxis dataKey="segment" />
            <Radar
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Overall score up by 4.3% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Retention metrics show strongest performance
        </div>
      </CardFooter>
    </Card>
  )
}