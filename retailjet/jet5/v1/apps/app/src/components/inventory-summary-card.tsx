"use client"

import { useState } from "react"
import { Package } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card"
import { Progress } from "@/components/progress"

// Define the InventoryItem interface
interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    stock: number;
    optimal: number;
    daysOfSupply: number;
    status: string;
    location: string;
    category: string;
    lastUpdated: string;
    price: number;
    cost: number;
    turnover: number;
    sales30d: number;
}

// Sample inventory data
const inventoryData = [
  {
    id: "1",
    name: "Ultra Comfort Pillow",
    sku: "UCP-001",
    stock: 85,
    optimal: 100,
    daysOfSupply: 28,
    status: "In Stock",
    location: "US-East",
    category: "Home Goods",
    lastUpdated: "2024-03-01",
    price: 29.99,
    cost: 12.50,
    turnover: 3.2,
    sales30d: 45
  },
  {
    id: "2",
    name: "Premium Kitchen Knife Set",
    sku: "PKK-002",
    stock: 32,
    optimal: 50,
    daysOfSupply: 45,
    status: "In Stock",
    location: "US-West",
    category: "Kitchen",
    lastUpdated: "2024-03-02",
    price: 89.99,
    cost: 38.75,
    turnover: 1.8,
    sales30d: 12
  },
  {
    id: "3",
    name: "Wireless Earbuds Pro",
    sku: "WEP-003",
    stock: 12,
    optimal: 60,
    daysOfSupply: 12,
    status: "Low Stock",
    location: "US-Central",
    category: "Electronics",
    lastUpdated: "2024-03-01",
    price: 149.99,
    cost: 72.50,
    turnover: 4.5,
    sales30d: 80
  },
  {
    id: "4",
    name: "Natural Bamboo Cutting Board",
    sku: "NBC-004",
    stock: 8,
    optimal: 40,
    daysOfSupply: 8,
    status: "Low Stock",
    location: "US-East",
    category: "Kitchen",
    lastUpdated: "2024-02-28",
    price: 24.99,
    cost: 9.25,
    turnover: 5.1,
    sales30d: 52
  },
  {
    id: "5",
    name: "Smart LED Light Bulbs (4-Pack)",
    sku: "SLB-005",
    stock: 65,
    optimal: 80,
    daysOfSupply: 22,
    status: "In Stock",
    location: "US-West", 
    category: "Electronics",
    lastUpdated: "2024-03-03",
    price: 39.99,
    cost: 18.75,
    turnover: 3.7,
    sales30d: 36
  },
  {
    id: "6",
    name: "Professional Hair Dryer",
    sku: "PHD-006",
    stock: 0,
    optimal: 30,
    daysOfSupply: 0,
    status: "Out of Stock",
    location: "US-Central",
    category: "Beauty",
    lastUpdated: "2024-02-25",
    price: 79.99,
    cost: 32.50,
    turnover: 2.6,
    sales30d: 22
  },
  {
    id: "7",
    name: "Organic Cotton Bath Towels",
    sku: "OCT-007",
    stock: 42,
    optimal: 60,
    daysOfSupply: 35,
    status: "In Stock",
    location: "US-East",
    category: "Home Goods",
    lastUpdated: "2024-03-04",
    price: 34.99,
    cost: 14.25,
    turnover: 2.9,
    sales30d: 28
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    sku: "SSB-008",
    stock: 7,
    optimal: 45,
    daysOfSupply: 5,
    status: "Low Stock",
    location: "US-West",
    category: "Outdoor",
    lastUpdated: "2024-03-02",
    price: 19.99,
    cost: 7.50,
    turnover: 6.2,
    sales30d: 95
  }
];

// Function to calculate inventory metrics
const calculateInventoryMetrics = (data: InventoryItem[]) => {
  const totalValue = data.reduce((sum, item) => sum + (item.stock * item.cost), 0);
  const totalPotentialValue = data.reduce((sum, item) => sum + (item.optimal * item.cost), 0);
  const stockToOptimalRatio = (data.reduce((sum, item) => sum + item.stock, 0) / 
                               data.reduce((sum, item) => sum + item.optimal, 0)) * 100;
  
  const inStock = data.filter((item: InventoryItem) => item.status === "In Stock").length;
  const lowStock = data.filter((item: InventoryItem) => item.status === "Low Stock").length;
  const outOfStock = data.filter((item: InventoryItem) => item.status === "Out of Stock").length;
  
  const avgTurnoverRate = data.reduce((sum, item) => sum + item.turnover, 0) / data.length;
  
  return {
    totalValue: totalValue,
    totalPotentialValue: totalPotentialValue,
    stockToOptimalRatio: stockToOptimalRatio.toFixed(1),
    inStock,
    lowStock,
    outOfStock,
    total: data.length,
    avgTurnoverRate: avgTurnoverRate.toFixed(1)
  };
};

// Changed from default export to named export
export function InventorySummary() {
  // Calculate inventory metrics
  const metrics = calculateInventoryMetrics(inventoryData);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base font-medium">
          <Package className="mr-2 h-4 w-4" />
          Inventory Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-3xl font-bold">{metrics.total}</div>
        <p className="text-xs text-muted-foreground">Total SKUs</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              In Stock
            </span>
            <span>{metrics.inStock} ({((metrics.inStock / metrics.total) * 100).toFixed(1)}%)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
              Low Stock
            </span>
            <span>{metrics.lowStock} ({((metrics.lowStock / metrics.total) * 100).toFixed(1)}%)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
              Out of Stock
            </span>
            <span>{metrics.outOfStock} ({((metrics.outOfStock / metrics.total) * 100).toFixed(1)}%)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 mt-auto">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-medium">Stock Level</span>
          <span className="text-sm font-medium">{metrics.stockToOptimalRatio}%</span>
        </div>
        <Progress className="mt-2" value={parseFloat(metrics.stockToOptimalRatio)} />
      </CardFooter>
    </Card>
  );
}