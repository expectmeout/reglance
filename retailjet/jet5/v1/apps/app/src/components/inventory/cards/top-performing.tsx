"use client";

import { BarChart2, TrendingUp, ArrowRight, ExternalLink } from "lucide-react";
import { Progress } from "@/components/progress";
import { Button } from "@/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useState } from "react";

// Product data interface
interface ProductPerformance {
  id: string;
  name: string;
  revenue: number;
  profit: number;
  turnover: number;
  change: number;
}

// Sample product performance data
const productPerformanceData: ProductPerformance[] = [
  { id: "3", name: "Wireless Earbuds Pro", revenue: 11999.20, profit: 6199.60, turnover: 4.5, change: 12.3 },
  { id: "8", name: "Stainless Steel Water Bottle", revenue: 1899.05, profit: 1186.55, turnover: 6.2, change: 8.5 },
  { id: "4", name: "Natural Bamboo Cutting Board", revenue: 1299.48, profit: 817.68, turnover: 5.1, change: 3.2 },
  { id: "5", name: "Smart LED Light Bulbs", revenue: 1439.64, profit: 763.64, turnover: 3.7, change: -2.1 },
  { id: "1", name: "Ultra Comfort Pillow", revenue: 1349.55, profit: 787.05, turnover: 3.2, change: 5.8 }
];

export function TopPerformingProductsCard() {
  const [sortBy, setSortBy] = useState("revenue");
  
  // Sort products based on selected criteria
  const sortedProducts = [...productPerformanceData]
    .sort((a, b) => {
      if (sortBy === "revenue") return b.revenue - a.revenue;
      if (sortBy === "profit") return b.profit - a.profit;
      if (sortBy === "turnover") return b.turnover - a.turnover;
      return 0;
    })
    .slice(0, 3);
  
  // Calculate the highest value for percentage calculation
  const highestValue = sortBy === "revenue" 
    ? Math.max(...sortedProducts.map(p => p.revenue))
    : sortBy === "profit"
      ? Math.max(...sortedProducts.map(p => p.profit))
      : Math.max(...sortedProducts.map(p => p.turnover));

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-full">
            <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold">Top Performing Products</h3>
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[120px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="profit">Profit</SelectItem>
            <SelectItem value="turnover">Turnover</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-6 flex-grow">
        {sortedProducts.map((product, index) => {
          // Calculate the display value based on sort criteria
          const displayValue = sortBy === "revenue" 
            ? product.revenue 
            : sortBy === "profit" 
              ? product.profit 
              : product.turnover;
          
          // Format the display value
          const formattedValue = sortBy === "turnover" 
            ? `${displayValue}x` 
            : `$${displayValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          
          // Calculate progress percentage
          const progressValue = (displayValue / highestValue) * 100;
          
          return (
            <div key={product.id} className="relative">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="w-5 text-muted-foreground text-sm">{index + 1}.</span>
                    <h4 className="text-sm font-medium truncate max-w-[150px]">{product.name}</h4>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground ml-5 mt-1">
                    <span className="mr-2">Turnover: {product.turnover}x</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center">
                            {product.change > 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <ArrowRight className="h-3 w-3 text-red-500 rotate-45" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{product.change > 0 ? "+" : ""}{product.change}% vs. last period</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formattedValue}</p>
                  {sortBy === "revenue" && (
                    <p className="text-xs text-green-600">+${product.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  )}
                </div>
              </div>
              <Progress 
                value={progressValue} 
                className="mt-2" 
              />
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Total {sortBy}</p>
          <p className="text-xs text-muted-foreground">
            {sortBy === "revenue" 
              ? `$${productPerformanceData.reduce((sum, p) => sum + p.revenue, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              : sortBy === "profit"
                ? `$${productPerformanceData.reduce((sum, p) => sum + p.profit, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                : `${(productPerformanceData.reduce((sum, p) => sum + p.turnover, 0) / productPerformanceData.length).toFixed(1)}x avg`}
          </p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          <span className="text-xs">View All</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}

export default TopPerformingProductsCard;