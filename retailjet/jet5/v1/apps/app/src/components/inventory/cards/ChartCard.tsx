// File: /home/rj/projects/retailjet/jet5/v1/apps/app/src/components/inventory/cards/ChartCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { StandardBarChart } from "./StandardBarChart";
import { StandardRadarChart } from "./StandardRadarChart";

type ChartType = "bar" | "radar";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  chartType: ChartType;
  data: Array<any>;
  height?: number;
  // Bar chart specific props
  dataKey?: string;
  categoryKey?: string;
  color?: string;
  layout?: "vertical" | "horizontal";
  // Radar chart specific props
  dataKeys?: string[];
  colors?: string[];
  // Common props
  trendValue?: number | null;
  trendDirection?: "up" | "down";
  timeRange?: string;
  showLegend?: boolean;
  showFooter?: boolean;
}

export function ChartCard({
  title,
  subtitle,
  chartType,
  data,
  height = 300,
  // Bar chart props
  dataKey = "value",
  categoryKey = "category",
  color = "primary",
  layout = "vertical",
  // Radar chart props
  dataKeys = ["value"],
  colors = ["primary"],
  // Common props
  trendValue = null,
  trendDirection = "up",
  timeRange,
  showLegend = true,
  showFooter = true
}: ChartCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        {chartType === "bar" ? (
          <StandardBarChart
            data={data}
            height={height}
            dataKey={dataKey}
            categoryKey={categoryKey}
            color={color}
            layout={layout}
            trendValue={trendValue}
            trendDirection={trendDirection}
            timeRange={timeRange}
            showFooter={showFooter}
          />
        ) : (
          <StandardRadarChart
            data={data}
            height={height}
            dataKeys={dataKeys}
            colors={colors}
            trendValue={trendValue}
            trendDirection={trendDirection}
            showLegend={showLegend}
            showFooter={showFooter}
          />
        )}
      </CardContent>
    </Card>
  );
}