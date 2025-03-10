// File: /home/rj/projects/retailjet/jet5/v1/apps/app/src/components/inventory/cards/restock-priority-card.tsx

import { ShoppingCart, Truck, Clock, DollarSign, Store, Archive, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/hover-card";
import { Progress } from "@/components/progress";

// Types for restock priority data
type RestockPriority = "critical" | "high" | "medium" | "low";
type Channel = "amazon" | "walmart" | "shopify";

interface RestockItem {
  id: string;
  name: string;
  sku: string;
  priority: RestockPriority;
  channels: Channel[];
  currentStock: number;
  reorderPoint: number;
  suggestedQuantity: number;
  leadTime: number;
  salesVelocity: number;
  potentialRevenueLoss: number;
  lastRestocked: string;
}

// Mock data for restock items
const restockItems: RestockItem[] = [
  {
    id: "rst-1",
    name: "Wireless Earbuds Pro",
    sku: "WEP-2023-BLK",
    priority: "critical",
    channels: ["amazon", "walmart"],
    currentStock: 12,
    reorderPoint: 50,
    suggestedQuantity: 200,
    leadTime: 14,
    salesVelocity: 8.5,
    potentialRevenueLoss: 4999.95,
    lastRestocked: "2024-02-15"
  },
  {
    id: "rst-2",
    name: "Stainless Steel Water Bottle",
    sku: "SSWB-32-SLV",
    priority: "high",
    channels: ["amazon", "shopify"],
    currentStock: 45,
    reorderPoint: 75,
    suggestedQuantity: 150,
    leadTime: 10,
    salesVelocity: 5.2,
    potentialRevenueLoss: 2499.50,
    lastRestocked: "2024-02-20"
  },
  {
    id: "rst-3",
    name: "Smart LED Light Bulbs",
    sku: "SLB-RGBW-4PK",
    priority: "medium",
    channels: ["amazon", "walmart", "shopify"],
    currentStock: 89,
    reorderPoint: 100,
    suggestedQuantity: 120,
    leadTime: 7,
    salesVelocity: 3.8,
    potentialRevenueLoss: 1599.80,
    lastRestocked: "2024-02-25"
  }
];

// Helper function to get channel icon
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

// Helper function to get priority styles
const getPriorityStyles = (priority: RestockPriority) => {
  switch (priority) {
    case "critical":
      return {
        bg: "bg-red-100 dark:bg-red-900",
        text: "text-red-800 dark:text-red-300",
        border: "border-red-200 dark:border-red-800"
      };
    case "high":
      return {
        bg: "bg-orange-100 dark:bg-orange-900",
        text: "text-orange-800 dark:text-orange-300",
        border: "border-orange-200 dark:border-orange-800"
      };
    case "medium":
      return {
        bg: "bg-yellow-100 dark:bg-yellow-900",
        text: "text-yellow-800 dark:text-yellow-300",
        border: "border-yellow-200 dark:border-yellow-800"
      };
    case "low":
      return {
        bg: "bg-green-100 dark:bg-green-900",
        text: "text-green-800 dark:text-green-300",
        border: "border-green-200 dark:border-green-800"
      };
  }
};

// Single restock item component
const RestockItemCard = ({ item }: { item: RestockItem }) => {
  const priorityStyles = getPriorityStyles(item.priority);
  const stockPercentage = (item.currentStock / item.reorderPoint) * 100;
  
  return (
    <div className={`p-4 rounded-lg border ${priorityStyles.border} mb-3 last:mb-0`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-sm text-muted-foreground">{item.sku}</p>
        </div>
        <Badge className={`${priorityStyles.bg} ${priorityStyles.text}`}>
          {item.priority}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {item.channels.map((channel) => (
            <div key={channel} className="text-muted-foreground">
              {getChannelIcon(channel)}
            </div>
          ))}
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Current Stock</span>
            <span>{item.currentStock} units</span>
          </div>
          <Progress 
            value={stockPercentage} 
            className="h-2"
            indicatorClassName={stockPercentage < 25 ? "bg-red-500" : 
                              stockPercentage < 50 ? "bg-yellow-500" : "bg-green-500"}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Lead Time:</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{item.leadTime} days</span>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Sales Velocity:</span>
            <div className="flex items-center gap-1 mt-0.5">
              <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{item.salesVelocity}/day</span>
            </div>
          </div>
        </div>
        
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <AlertTriangle className="h-3.5 w-3.5 mr-1 text-yellow-500" />
              Potential Loss: ${item.potentialRevenueLoss.toLocaleString()}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Revenue Impact Analysis</h4>
              <div className="text-sm space-y-1">
                <p>Based on current sales velocity and lead time:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Expected stockout in {Math.floor(item.currentStock / item.salesVelocity)} days</li>
                  <li>Average daily revenue: ${(item.potentialRevenueLoss / item.leadTime).toFixed(2)}</li>
                  <li>Suggested reorder quantity: {item.suggestedQuantity} units</li>
                </ul>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <div className="flex gap-2">
          <Button className="flex-1">
            <Truck className="h-4 w-4 mr-1" />
            Create PO
          </Button>
          <Button variant="outline" className="flex-1">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export const RestockPriorityCard = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <h3 className="font-semibold">Restock Priorities</h3>
        </div>
        
        <Button variant="outline" size="sm">
          <DollarSign className="h-3.5 w-3.5 mr-1" />
          Generate All POs
        </Button>
      </div>
      
      <div className="flex-grow overflow-auto">
        {restockItems.map((item) => (
          <RestockItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RestockPriorityCard;