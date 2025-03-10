"use client"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis, Line, LineChart, Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
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

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-3))", // Changed from chart-2 (green) to chart-3 (orange)
  },
  amazon: {
    label: "Amazon",
    color: "hsl(var(--chart-1))",
  },
  walmart: {
    label: "Walmart",
    color: "hsl(var(--chart-3))", // Changed from chart-2 (green) to chart-3 (orange)
  },
  shopify: {
    label: "Shopify",
    color: "hsl(var(--chart-2))", 
  },
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "NY",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "FL",
    color: "hsl(var(--chart-3))", // Changed from chart-2 (green) to chart-3 (orange)
  },
  firefox: {
    label: "PA",
    color: "hsl(var(--chart-2))",
  },
  edge: {
    label: "ATL",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function MainDashboardCharts() {
  // Data for the first (original) chart
  const chartData1 = [{ month: "january", amazon: 23118, walmart: 7706, shopify: 7706 }]
  
  // Data for the new charts
  const visitorTrendData = [
    { month: "January", visitors: 186 },
    { month: "February", visitors: 205 },
    { month: "March", visitors: -207 },
    { month: "April", visitors: 173 },
    { month: "May", visitors: -209 },
    { month: "June", visitors: 214 },
  ]
  
  const browserData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ]
  
  const deviceData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Keep the original first chart */}
      <RadialBarCard 
        title="Sales Distribution" 
        description="January 2024" 
        data={chartData1}
        trend={{ value: 5.2, direction: "up" }}
        message="Showing total sales for January"
        customKeys={["amazon", "walmart", "shopify"]}
        className="text-left"
      />
                 {/* Replace the fourth card with device type chart */}
                 <Card>
        <CardHeader>
          <CardTitle>ACOS vs Last Month</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={deviceData}
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
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="hsl(var(--chart-3))" // Changed from var(--color-mobile) to directly use orange
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                ACOS improved by 9.1% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Showing device usage trends over time
              </div>
            </div>
          </div>
        </CardFooter>
      </Card> 
      {/* Replace the second card with visitor trend chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Traffic</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={visitorTrendData}>
              <CartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel hideIndicator />}
              />
              <Bar dataKey="visitors">
                <LabelList position="top" dataKey="month" fillOpacity={1} />
                {visitorTrendData.map((item) => (
                  <Cell
                    key={item.month}
                    fill={
                      item.visitors > 0
                        ? "hsl(var(--chart-1))"
                        : "hsl(var(--chart-3))" // Changed from chart-2 (green) to chart-3 (orange)
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      {/* Replace the third card with browser distribution chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by State</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={browserData}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey="browser"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  chartConfig[value]?.label
                }
              />
              <XAxis dataKey="visitors" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="visitors" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            New York sales up by 8.3% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing sales distribution by top states
          </div>
        </CardFooter>
      </Card>
      

    </div>
  )
}

// Component for the first (original) radial bar card
function RadialBarCard({ title, description, data, trend, message, customKeys = ["desktop", "mobile"], className }) {
  const totalValues = customKeys.reduce((sum, key) => sum + (data[0][key] || 0), 0)

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader className="items-start pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[260px]"
        >
          <RadialBarChart
            data={data}
            endAngle={180}
            innerRadius={90}
            outerRadius={150}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 18}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${totalValues.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 8}
                          className="fill-muted-foreground text-base"
                        >
                          {customKeys.includes("amazon") ? "Sales" : "Visitors"}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            {customKeys.map((key, index) => (
              <RadialBar
                key={key}
                dataKey={key}
                stackId="a"
                cornerRadius={6}
                fill={`var(--color-${key})`}
                className="stroke-transparent stroke-2"
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mt-[-80px]">
        <div className="flex items-center gap-2 font-medium leading-none -mt-0">
          Trending {trend.direction} by {trend.value}% this month {
            trend.direction === "up" 
              ? <TrendingUp className="h-4 w-4" /> 
              : <TrendingDown className="h-4 w-4" />
          }
        </div>
        <div className="leading-none text-muted-foreground">
          {message}
        </div>
      </CardFooter>
    </Card>
  )
}