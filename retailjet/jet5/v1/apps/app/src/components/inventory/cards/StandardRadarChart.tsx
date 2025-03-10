// File: src/components/charts/StandardRadarChart.tsx
// Standardized Radar Chart Component

import { TrendingUp, TrendingDown } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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

interface StandardRadarChartProps {
  title?: string;
  subtitle?: string;
  data: Array<any>;
  height?: number;
  dataKeys?: string[];
  colors?: string[];
  trendValue?: number | null;
  trendDirection?: "up" | "down";
  showLegend?: boolean;
  showFooter?: boolean;
}

export function StandardRadarChart({
  title = "",
  subtitle = "",
  data = [],
  height = 300,
  dataKeys = ["value"],
  colors = ["primary"],
  trendValue = null,
  trendDirection = "up",
  showLegend = true,
  showFooter = true
}: StandardRadarChartProps) {
  // Create chart config
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
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart
            data={data}
            margin={{
              top: -40,
              bottom: -10,
            }}
            height={height}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            
            {dataKeys.map((key, idx) => (
              <Radar
                key={key}
                dataKey={key}
                fill={CHART_COLORS[colors[idx] || "primary"]}
                fillOpacity={0.6}
              />
            ))}
            
            {showLegend && (
              <ChartLegend className="mt-8" content={<ChartLegendContent />} />
            )}
          </RadarChart>
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
        </div>
      )}
    </div>
  );
}