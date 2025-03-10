"use client"

import React from "react"

// Performance Metrics Card Component
export interface PerformanceMetric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  trendLabel: string;
  trendDirection: "up" | "down";
  trendIsGood?: boolean;
}

export interface PerformanceMetricsCardProps {
  title: string;
  metrics: PerformanceMetric[];
}

export function PerformanceMetricsCard({ title, metrics }: PerformanceMetricsCardProps): JSX.Element {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-4 space-y-4">
          {metrics.map((metric, index) => {
            // Determine if the trend is good or bad based on direction and trendIsGood
            const isPositiveTrend = 
              (metric.trendDirection === 'up' && metric.trendIsGood) || 
              (metric.trendDirection === 'down' && metric.trendIsGood === false);
            
            return (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {metric.prefix}{metric.value.toLocaleString()}{metric.suffix}
                  </span>
                  <span className={`text-xs ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.trendDirection === 'up' ? '↑' : '↓'} {Math.abs(metric.trend)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
} 