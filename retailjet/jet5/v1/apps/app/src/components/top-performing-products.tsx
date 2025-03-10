"use client"

import { TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card"
import { Progress } from "@/components/progress"

// Product data interface
interface ProductPerformance {
  name: string;
  revenue: number;
  profit: number;
  turnover: number;
}

// Sample product performance data
const productPerformanceData = [
  { name: "Wireless Earbuds Pro", revenue: 11999.20, profit: 6199.60, turnover: 4.5 },
  { name: "Stainless Steel Water Bottle", revenue: 1899.05, profit: 1186.55, turnover: 6.2 },
  { name: "Natural Bamboo Cutting Board", revenue: 1299.48, profit: 817.68, turnover: 5.1 },
  { name: "Smart LED Light Bulbs", revenue: 1439.64, profit: 763.64, turnover: 3.7 },
  { name: "Ultra Comfort Pillow", revenue: 1349.55, profit: 787.05, turnover: 3.2 }
];

export function TopPerformingProducts() {
  // Get top 3 products by revenue
  const topProducts = [...productPerformanceData]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);
  
  // Calculate the highest revenue for percentage calculation
  const highestRevenue = topProducts[0]?.revenue || 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-base font-medium">Top Performing Products</CardTitle>
        <CardDescription>By sales volume</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-6">
          {topProducts.map((product, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-2">Turnover: {product.turnover}x</span>
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${product.revenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+${product.profit.toLocaleString()}</p>
                </div>
              </div>
              <Progress 
                className="mt-2" 
                value={(product.revenue / highestRevenue) * 100} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}