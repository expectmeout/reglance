// File: /home/rj/projects/retailjet/jet5/v1/apps/app/src/components/inventory/cards/allocation-optimizer-card.tsx

import { useState } from "react";
import { SplitSquareVertical, PieChart, MoveHorizontal, Store, ShoppingCart, Archive, TrendingUp, DollarSign, BarChart4 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Slider } from "@/components/slider";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/hover-card";

// Types for allocation data
type Channel = "amazon" | "walmart" | "shopify";

interface ChannelAllocation {
  channel: Channel;
  currentAllocation: number;
  suggestedAllocation: number;
  profitMargin: number;
  salesVelocity: number;
  stockLevel: number;
  revenue: number;
}

interface ProductAllocation {
  id: string;
  name: string;
  sku: string;
  totalStock: number;
  allocations: ChannelAllocation[];
}

// Mock data for RetailJet's boutique digital branding platform
const allocationData: ProductAllocation = {
  id: "prod-1",
  name: "PrimeLeap® Analytics Package",
  sku: "PLP-2023-PRO",
  totalStock: 1000,
  allocations: [
    {
      channel: "amazon",
      currentAllocation: 500,
      suggestedAllocation: 600,
      profitMargin: 32,
      salesVelocity: 15,
      stockLevel: 85,
      revenue: 24999.95
    },
    {
      channel: "walmart",
      currentAllocation: 300,
      suggestedAllocation: 250,
      profitMargin: 28,
      salesVelocity: 8,
      stockLevel: 120,
      revenue: 14999.95
    },
    {
      channel: "shopify",
      currentAllocation: 200,
      suggestedAllocation: 150,
      profitMargin: 45,
      salesVelocity: 5,
      stockLevel: 95,
      revenue: 9999.95
    }
  ]
};

// Helper functions
const getChannelIcon = (channel: Channel) => {
  switch (channel) {
    case "amazon":
      return <Store className="h-4 w-4" />;
    case "walmart":
      return <ShoppingCart className="h-4 w-4" />;
    case "shopify":
      return <Archive className="h-4 w-4" />;
  }
};

const getChannelName = (channel: Channel) => {
  return channel.charAt(0).toUpperCase() + channel.slice(1);
};

// Channel allocation slider component following shadcn/ui pattern
const ChannelAllocationSlider = ({ 
  allocation,
  totalStock,
  onAllocationChange
}: { 
  allocation: ChannelAllocation;
  totalStock: number;
  onAllocationChange: (value: number) => void;
}) => {
  const percentage = (allocation.currentAllocation / totalStock) * 100;
  const suggestedPercentage = (allocation.suggestedAllocation / totalStock) * 100;
  
  return (
    <div className="space-y-4 p-4 rounded-lg border dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getChannelIcon(allocation.channel)}
          <span className="font-medium">{getChannelName(allocation.channel)}</span>
        </div>
        <Badge variant="outline">
          {allocation.currentAllocation} units
        </Badge>
      </div>
      
      <div className="space-y-2">
        <Slider
          defaultValue={[percentage]}
          max={100}
          step={1}
          onValueChange={(values) => onAllocationChange(Math.round((values[0] / 100) * totalStock))}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        />
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{allocation.salesVelocity}/day</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{allocation.profitMargin}% margin</span>
          </div>
        </div>
        
        {allocation.currentAllocation !== allocation.suggestedAllocation && (
          <div className="text-sm text-muted-foreground">
            Suggested: {allocation.suggestedAllocation} units ({suggestedPercentage.toFixed(1)}%)
          </div>
        )}
      </div>
    </div>
  );
};

// Metrics comparison component
const MetricsComparison = ({ 
  currentMetrics,
  projectedMetrics 
}: { 
  currentMetrics: { revenue: number; margin: number };
  projectedMetrics: { revenue: number; margin: number };
}) => {
  const revenueChange = ((projectedMetrics.revenue - currentMetrics.revenue) / currentMetrics.revenue) * 100;
  const marginChange = projectedMetrics.margin - currentMetrics.margin;
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Current</h4>
        <div className="space-y-1">
          <div className="text-2xl font-bold">
            ${currentMetrics.revenue.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentMetrics.margin.toFixed(1)}% avg margin
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Projected</h4>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-primary">
            ${projectedMetrics.revenue.toLocaleString()}
            <span className="text-sm font-normal text-green-500 ml-1">
              (+{revenueChange.toFixed(1)}%)
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {projectedMetrics.margin.toFixed(1)}% avg margin
            <span className={`ml-1 ${marginChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ({marginChange >= 0 ? '+' : ''}{marginChange.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AllocationOptimizerCard = () => {
  const [allocations, setAllocations] = useState(allocationData.allocations);
  
  const currentMetrics = {
    revenue: allocations.reduce((sum, a) => sum + a.revenue, 0),
    margin: allocations.reduce((sum, a) => sum + a.profitMargin, 0) / allocations.length
  };
  
  const projectedMetrics = {
    revenue: currentMetrics.revenue * 1.15, // Example projection
    margin: currentMetrics.margin + 2.5
  };

  const handleAllocationChange = (channel: Channel, newValue: number) => {
    setAllocations(prev => prev.map(a => 
      a.channel === channel ? { ...a, currentAllocation: newValue } : a
    ));
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <SplitSquareVertical className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Channel Allocation Optimizer</h3>
        </div>
        
        <Button variant="outline" size="sm">
          <BarChart4 className="h-3.5 w-3.5 mr-1" />
          View History
        </Button>
      </div>
      
      <div className="flex-grow">
        <Tabs defaultValue="allocation" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="allocation" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{allocationData.name}</h4>
                  <p className="text-sm text-muted-foreground">{allocationData.sku}</p>
                </div>
                <Badge variant="outline" className="ml-auto">
                  {allocationData.totalStock} total units
                </Badge>
              </div>
              
              {allocations.map((allocation) => (
                <ChannelAllocationSlider
                  key={allocation.channel}
                  allocation={allocation}
                  totalStock={allocationData.totalStock}
                  onAllocationChange={(value) => handleAllocationChange(allocation.channel, value)}
                />
              ))}

              <Button className="w-full mt-4" variant="outline">
                Reset to Current Allocation
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-4">
            <div className="space-y-6">
              <MetricsComparison
                currentMetrics={currentMetrics}
                projectedMetrics={projectedMetrics}
              />
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Channel Performance</h4>
                {allocations.map((allocation) => (
                  <HoverCard key={allocation.channel}>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center justify-between p-2 rounded-lg border dark:border-gray-800 cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          {getChannelIcon(allocation.channel)}
                          <span>{getChannelName(allocation.channel)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            ${allocation.revenue.toLocaleString()}
                          </span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Channel Metrics</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Sales Velocity</p>
                            <p className="font-medium">{allocation.salesVelocity} units/day</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Stock Level</p>
                            <p className="font-medium">{allocation.stockLevel} units</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Profit Margin</p>
                            <p className="font-medium">{allocation.profitMargin}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-medium">${allocation.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
              
              <Button className="w-full">
                Apply Suggested Allocation
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AllocationOptimizerCard;