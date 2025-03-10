// File: /home/rj/projects/retailjet/jet5/v1/apps/app/src/components/inventory/cards/channel-performance-card.tsx

import { BarChart3, TrendingUp, TrendingDown, Store, ShoppingCart, Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Badge } from "@/components/badge";

// Type definitions
type ChannelPerformanceMetric = {
  sellThrough: number;
  sellThroughChange: number;
  conversion: number;
  conversionChange: number;
  stockTurnover: number;
  stockTurnoverChange: number;
  // Data points for sparkline charts (last 7 days)
  sparklineData: number[];
};

type ChannelData = {
  [key: string]: ChannelPerformanceMetric;
};

// Mock performance data
const channelPerformanceData: ChannelData = {
  amazon: {
    sellThrough: 78.4,
    sellThroughChange: 4.2,
    conversion: 12.8,
    conversionChange: 1.5,
    stockTurnover: 5.6,
    stockTurnoverChange: -0.3,
    sparklineData: [65, 74, 70, 69, 72, 76, 78],
  },
  walmart: {
    sellThrough: 64.7,
    sellThroughChange: 2.1,
    conversion: 9.5,
    conversionChange: 0.8,
    stockTurnover: 4.2,
    stockTurnoverChange: 0.4,
    sparklineData: [58, 62, 60, 65, 61, 63, 65],
  },
  shopify: {
    sellThrough: 72.1,
    sellThroughChange: -1.8,
    conversion: 10.2,
    conversionChange: -0.6,
    stockTurnover: 3.8,
    stockTurnoverChange: 0.2,
    sparklineData: [75, 72, 70, 68, 67, 70, 72],
  },
};

// Helper to get channel icon
const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "amazon":
      return <Store className="h-4 w-4" />;
    case "walmart":
      return <ShoppingCart className="h-4 w-4" />;
    case "shopify":
      return <Archive className="h-4 w-4" />;
    default:
      return <Store className="h-4 w-4" />;
  }
};

// Helper to get channel name
const getChannelName = (channel: string) => {
  switch (channel) {
    case "amazon":
      return "Amazon";
    case "walmart":
      return "Walmart";
    case "shopify":
      return "Shopify";
    default:
      return channel;
  }
};

// Sparkline chart component
const Sparkline = ({ data }: { data: number[] }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Convert data points to SVG path coordinates
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(" ");
  
  return (
    <div className="h-6 w-16">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
      </svg>
    </div>
  );
};

// Performance metric component with change indicator
const MetricWithChange = ({ 
  value, 
  change, 
  suffix = "%",
  sparkData
}: { 
  value: number; 
  change: number; 
  suffix?: string;
  sparkData: number[]
}) => (
  <div className="flex items-center justify-between">
    <div>
      <span className="text-xl font-bold">{value.toFixed(1)}{suffix}</span>
      <div className="flex items-center gap-1 mt-1">
        {change > 0 ? (
          <TrendingUp className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-red-500" />
        )}
        <span className={`text-xs font-medium ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? '+' : ''}{change.toFixed(1)}{suffix}
        </span>
      </div>
    </div>
    <Sparkline data={sparkData} />
  </div>
);

// Channel comparison section
const ChannelComparisonSection = ({ metric }: { metric: 'sellThrough' | 'conversion' | 'stockTurnover' }) => {
  // Get appropriate labels based on metric
  const getMetricLabel = () => {
    switch (metric) {
      case 'sellThrough':
        return "Sell-Through Rate";
      case 'conversion':
        return "Conversion Rate";
      case 'stockTurnover':
        return "Stock Turnover";
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground">{getMetricLabel()}</h4>
      
      <div className="space-y-4">
        {Object.entries(channelPerformanceData).map(([channel, data]) => (
          <div key={channel} className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              {getChannelIcon(channel)}
              <span className="text-sm font-medium">{getChannelName(channel)}</span>
            </div>
            <MetricWithChange 
              value={data[metric]} 
              change={data[`${metric}Change`]} 
              sparkData={data.sparklineData}
              suffix={metric === 'stockTurnover' ? 'x' : '%'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChannelPerformanceCard = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold">Channel Performance</h3>
      </div>
      
      <div className="flex-grow">
        <Tabs defaultValue="sellThrough" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sellThrough">Sell-Through</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
            <TabsTrigger value="stockTurnover">Stock Turnover</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sellThrough" className="pt-4">
            <ChannelComparisonSection metric="sellThrough" />
          </TabsContent>
          
          <TabsContent value="conversion" className="pt-4">
            <ChannelComparisonSection metric="conversion" />
          </TabsContent>
          
          <TabsContent value="stockTurnover" className="pt-4">
            <ChannelComparisonSection metric="stockTurnover" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChannelPerformanceCard;