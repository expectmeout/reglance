"use client";

import React from 'react';
import { useCallback } from "react";
import { AlertTriangle, TrendingUp, ExternalLink } from "lucide-react";
import { Badge } from "@/components/badge";
import { Button } from "@v1/ui/button";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger 
} from "@/components/hover-card";
import { Progress } from "@/components/progress";

// Define the inventory item interface
interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  daysOfSupply: number;
  priority: "high" | "medium" | "low";
}

// Sample inventory data that needs restocking
const inventoryData = [
  {
    id: "6",
    name: "Professional Hair Dryer",
    stock: 0,
    daysOfSupply: 0,
    priority: "high" as const
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    stock: 7,
    daysOfSupply: 5,
    priority: "high" as const
  },
  {
    id: "4",
    name: "Natural Bamboo Cutting Board",
    stock: 8,
    daysOfSupply: 8,
    priority: "medium" as const
  },
  {
    id: "3",
    name: "Wireless Earbuds Pro",
    stock: 12,
    daysOfSupply: 12,
    priority: "low" as const
  }
];

export function RestockAlertsCard() {
  // Function to determine badge color based on days of supply
  const getBadgeVariant = useCallback((days: number): "default" | "secondary" | "destructive" | "outline" | null | undefined => {
    if (days < 5) {
      return "destructive";
    } else if (days < 10) {
      return "secondary";
    } else {
      return "default";
    }
  }, []);

  // Function to render the supply text
  const getSupplyText = useCallback((days: number) => {
    if (days <= 0) return "Out of stock";
    return `${days} days`;
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 dark:bg-amber-950 p-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="font-semibold">Restock Alerts</h3>
        </div>
        
        <Button variant="outline" size="sm" className="text-xs h-8">
          <ExternalLink className="h-3 w-3 mr-2" />
          View All
        </Button>
      </div>
      
      <div className="space-y-4 flex-grow">
        {inventoryData
          .filter(item => item.daysOfSupply < 15)
          .sort((a, b) => a.daysOfSupply - b.daysOfSupply)
          .slice(0, 3)
          .map(item => (
            <HoverCard key={item.id} openDelay={300}>
              <HoverCardTrigger asChild>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span className="mr-2">{item.stock} units left</span>
                      {item.daysOfSupply > 0 && item.daysOfSupply < 14 && (
                        <TrendingUp className="h-3 w-3 text-amber-500" />
                      )}
                    </div>
                  </div>
                  <Badge variant={getBadgeVariant(item.daysOfSupply)}>
                    {getSupplyText(item.daysOfSupply)}
                  </Badge>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Current stock:</span>
                      <span className="font-medium">{item.stock} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Days of supply:</span>
                      <span className="font-medium">{item.daysOfSupply}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Priority:</span>
                      <span className="capitalize font-medium">{item.priority}</span>
                    </div>
                  </div>
                  <Progress 
                    value={item.daysOfSupply > 0 ? (item.daysOfSupply / 30) * 100 : 0} 
                    className="h-1 mt-2"
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" className="text-xs h-7">
                      Order Now
                    </Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Need to reorder</p>
            <p className="text-xs text-muted-foreground">
              {inventoryData.filter(item => item.daysOfSupply < 15).length} products require attention
            </p>
          </div>
          <Button variant="outline" size="sm" className="text-xs h-8">
            Create PO
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RestockAlertsCard;