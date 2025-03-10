// File: src/components/charts/StandardBarChart.tsx
// Standardized Bar Chart Component

import { TrendingUp, TrendingDown } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
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

interface StandardBarChartProps {
  title?: string;
  subtitle?: string;
  data: Array<any>;
  height?: number;
  dataKey?: string;
  categoryKey?: string;
  color?: string;
  layout?: "vertical" | "horizontal";
  trendValue?: number | null;
  trendDirection?: "up" | "down";
  timeRange?: string;
  showFooter?: boolean;
}

export function StandardBarChart({
  title = "",
  subtitle = "",
  data = [],
  height = 300,
  dataKey = "value",
  categoryKey = "category",
  color = "primary",
  layout = "vertical",
  trendValue = null,
  trendDirection = "up",
  timeRange = "Jan - Jun 2024",
  showFooter = true
}: StandardBarChartProps) {
  // Create chart config
  const chartConfig: Record<string, { label: string; color: string }> = {
    [dataKey]: {
      label: title || dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
      color: CHART_COLORS[color]
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow">
        <ChartContainer config={chartConfig} className="h-full">
          <BarChart
            data={data}
            layout={layout}
            margin={{ left: 12, right: 12 }}
            height={height}
          >
            {layout === "vertical" ? (
              <>
                <YAxis
                  dataKey={categoryKey}
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <XAxis dataKey={dataKey} type="number" hide />
              </>
            ) : (
              <>
                <XAxis
                  dataKey={categoryKey}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis />
              </>
            )}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar 
              dataKey={dataKey} 
              fill={CHART_COLORS[color]}
              radius={4} 
            />
          </BarChart>
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