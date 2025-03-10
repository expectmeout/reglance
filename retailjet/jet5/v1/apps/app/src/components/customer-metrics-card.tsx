"use client"

import React from "react"

// Customer Metrics Card Component
export interface CustomerMetric {
  name: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  trendLabel: string;
  trendDirection: "up" | "down";
}

export interface CustomerMetricsCardProps {
  title: string;
  metrics: CustomerMetric[];
}

export function CustomerMetricsCard({ title, metrics }: CustomerMetricsCardProps): JSX.Element {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-4 space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{metric.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {metric.prefix}{metric.value.toLocaleString()}{metric.suffix}
                </span>
                <span className={`text-xs ${metric.trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.trendDirection === 'up' ? '↑' : '↓'} {Math.abs(metric.trend)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 