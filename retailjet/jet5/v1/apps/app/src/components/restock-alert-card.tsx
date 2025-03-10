"use client"

import { AlertTriangle } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/card"
import { Badge } from "@/components/badge"

// Define the InventoryItem interface - keeping only what's needed
interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  daysOfSupply: number;
}

// Sample inventory data with minimal properties
const inventoryData = [
  {
    id: "1",
    name: "Ultra Comfort Pillow",
    stock: 85,
    daysOfSupply: 28,
  },
  {
    id: "3",
    name: "Wireless Earbuds Pro",
    stock: 12,
    daysOfSupply: 12,
  },
  {
    id: "4",
    name: "Natural Bamboo Cutting Board",
    stock: 8,
    daysOfSupply: 8,
  },
  {
    id: "6",
    name: "Professional Hair Dryer",
    stock: 0,
    daysOfSupply: 0,
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    stock: 7,
    daysOfSupply: 5,
  }
];

export function RestockAlertCard() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base font-medium">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Restock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        {inventoryData
          .filter(item => item.daysOfSupply < 15)
          .sort((a, b) => a.daysOfSupply - b.daysOfSupply)
          .slice(0, 3)
          .map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.stock} units left</p>
              </div>
              <Badge variant="outline" 
                className={item.daysOfSupply <= 0 
                  ? "bg-red-100 text-red-800 border-red-300" 
                  : item.daysOfSupply <= 7 
                    ? "bg-red-100 text-red-800 border-red-300"
                    : "bg-yellow-100 text-yellow-800 border-yellow-300"
                }>
                {item.daysOfSupply > 0 ? `${item.daysOfSupply} days` : 'Out of stock'}
              </Badge>
            </div>
          ))}
        
        <div className="mt-2 pt-2 border-t">
          <p className="text-sm font-medium">Need to reorder</p>
          <p className="text-xs text-muted-foreground">{inventoryData.filter(item => item.daysOfSupply < 15).length} products require attention</p>
        </div>
      </CardContent>
    </Card>
  );
}