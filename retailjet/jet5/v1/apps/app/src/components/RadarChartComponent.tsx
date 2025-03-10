"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/card";
import { ChartContainer } from "@/components/chart";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";
import { inventoryHealthData } from "@/data/chartData"; // Adjust the import path as necessary
import { TrendingUp } from "lucide-react";
import { chartConfig } from "@/data/chartData"; // This should now work
import { Tooltip } from "@/components/tooltip";

const RadarChartComponent = () => {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart - Grid Filled</CardTitle>
        <CardDescription>Showing total visitors for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]" config={chartConfig}>
          <RadarChart data={inventoryHealthData}>
            <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarGrid className="fill-[--color-desktop] opacity-20" />
            <PolarAngleAxis dataKey="metric" />
            <Radar dataKey="value" fill="var(--color-desktop)" fillOpacity={0.5} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
};

export default RadarChartComponent; 