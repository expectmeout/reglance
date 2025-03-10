"use client";

import { useState } from "react";
import { Package, Info, TrendingUp, TrendingDown } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader,
  CardTitle, 
  CardDescription 
} from "@/components/card";
import { Progress } from "@/components/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card";
import { Badge } from "@/components/badge";

// Sample inventory data (you would replace this with actual data from an API)
const inventoryStats = {
  total: 8,
  inStock: 4,
  lowStock: 3,
  outOfStock: 1,
  stockToOptimalRatio: 54.1,
  avgTurnoverRate: 3.8,
  change: {
    stockLevel: 2.5,
    increasing: true
  }
};

export function InventorySummaryCard() {
  const [timeRange, setTimeRange] = useState("month");
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Inventory Summary</h3>
        </div>
        
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4 text-muted-foreground" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">About This Card</h4>
              <p className="text-sm text-muted-foreground">
                Shows current inventory status across all products. The stock level
                indicator displays the ratio of current stock to optimal inventory levels.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{inventoryStats.total}</div>
            <p className="text-sm text-muted-foreground">Total SKUs</p>
          </div>
          
          <Tabs
            value={timeRange}
            onValueChange={setTimeRange}
            className="h-9"
          >
            <TabsList className="grid w-[200px] grid-cols-3">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-3 gap-4 my-4">
          <StatusCard 
            status="In Stock" 
            count={inventoryStats.inStock} 
            total={inventoryStats.total} 
            color="bg-green-500" 
          />
          <StatusCard 
            status="Low Stock" 
            count={inventoryStats.lowStock} 
            total={inventoryStats.total} 
            color="bg-yellow-500" 
          />
          <StatusCard 
            status="Out of Stock" 
            count={inventoryStats.outOfStock} 
            total={inventoryStats.total} 
            color="bg-red-500" 
          />
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Stock Level</span>
              <Badge variant="outline" className="font-mono">
                {inventoryStats.stockToOptimalRatio}%
              </Badge>
            </div>
            
            <div className="flex items-center gap-1">
              {inventoryStats.change.increasing ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-xs font-medium ${
                inventoryStats.change.increasing ? 'text-green-500' : 'text-red-500'
              }`}>
                {inventoryStats.change.stockLevel}%
              </span>
            </div>
          </div>
          
          <Progress
            value={inventoryStats.stockToOptimalRatio}
            className="h-2 mt-2"
          />
          
          <p className="text-xs text-muted-foreground mt-2">
            Average turnover rate: {inventoryStats.avgTurnoverRate}x
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper component for status boxes
function StatusCard({ status, count, total, color }: { 
  status: string; 
  count: number; 
  total: number;
  color: string;
}) {
  const percentage = Math.round((count / total) * 100);
  
  return (
    <div className="bg-card border rounded-lg p-3">
      <div className="flex items-center">
        <div className={`h-3 w-3 rounded-full ${color} mr-2`}></div>
        <span className="text-sm font-medium">{status}</span>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-2xl font-semibold">{count}</span>
        <span className="text-xs text-muted-foreground">{percentage}%</span>
      </div>
    </div>
  );
}

// Helper Button component for this file (to avoid imports)
function Button({ children, variant, size, className, ...props }: any) {
  return (
    <button 
      className={`${className || ''} inline-flex items-center justify-center`}
      {...props}
    >
      {children}
    </button>
  );
}