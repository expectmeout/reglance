// File: src/components/charts/StandardAreaChart.tsx
// Standardized Area Chart Component for consistent styling

import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/chart";

// Standard color palette for consistent visual identity
const CHART_COLORS: Record<string, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
};

interface StandardAreaChartProps {
  title?: string;
  subtitle?: string;
  data: Array<any>;
  height?: number;
  dataKeys?: string[];
  colors?: string[];
  trendValue?: number | null;
  trendDirection?: "up" | "down";
  timeRange?: string;
  showFooter?: boolean;
}

export function StandardAreaChart({ 
  title = "",
  subtitle = "",
  data = [],
  height = 300,
  dataKeys = ["value1", "value2"],
  colors = ["primary", "secondary"],
  trendValue = null,
  trendDirection = "up",
  timeRange = "Jan - Jun 2024",
  showFooter = true
}: StandardAreaChartProps) {
  // Create chart config for ChartContainer
  const chartConfig = dataKeys.reduce<Record<string, { label: string; color: string }>>((config, key, index) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: CHART_COLORS[colors[index] || "primary"]
    };
    return config;
  }, {});

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow">
        <ChartContainer config={chartConfig} className="h-full">
          <AreaChart
            data={data}
            margin={{ left: 12, right: 12 }}
            height={height}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => typeof value === 'string' ? value.slice(0, 3) : value}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            
            {/* Create gradient definitions for each area */}
            <defs>
              {dataKeys.map((key, idx) => (
                <linearGradient 
                  key={key} 
                  id={`fill${key}`} 
                  x1="0" y1="0" 
                  x2="0" y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={CHART_COLORS[colors[idx] || "primary"]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={CHART_COLORS[colors[idx] || "primary"]}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            
            {/* Render each area with its gradient */}
            {dataKeys.map((key, idx) => (
              <Area
                key={key}
                dataKey={key}
                type="monotone"
                fill={`url(#fill${key})`}
                fillOpacity={0.4}
                stroke={CHART_COLORS[colors[idx] || "primary"]}
                stackId="1"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </div>
      
      {showFooter && (
        <div className="flex items-center justify-between mt-4 text-sm">
          {trendValue && (
            <div className="flex items-center gap-2 font-medium leading-none">
              {trendDirection === "up" ? (
                <>Trending up by {trendValue}% <TrendingUp className="h-4 w-4" /></>
              ) : (
                <>Trending down by {trendValue}% <TrendingDown className="h-4 w-4" /></>
              )}
            </div>
          )}
          {timeRange && (
            <div className="text-muted-foreground">
              {timeRange}
            </div>
          )}
        </div>
      )}
    </div>
  );
}