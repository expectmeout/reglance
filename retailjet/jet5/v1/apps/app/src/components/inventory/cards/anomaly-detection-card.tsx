// File: /home/rj/projects/retailjet/jet5/v1/apps/app/src/components/inventory/cards/anomaly-detection-card.tsx

import { AlertTriangle, Activity, ArrowUpRight, Store, ShoppingCart, Archive, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/hover-card";

// Type definitions for anomaly data
type AnomalyType = "stock_movement" | "price_change" | "conversion_drop" | "sell_through_drop";
type AnomalySeverity = "critical" | "warning" | "info";
type ChannelType = "amazon" | "walmart" | "shopify";

interface AnomalyData {
  id: string;
  type: AnomalyType;
  severity: AnomalySeverity;
  channel: ChannelType;
  message: string;
  detectedAt: string;
  product: {
    name: string;
    sku: string;
    prevValue: number;
    currValue: number;
    unit?: string;
  };
  suggestedAction?: string;
}

// Mock anomaly data
const anomalyData: AnomalyData[] = [
  {
    id: "anom-1",
    type: "stock_movement",
    severity: "critical",
    channel: "amazon",
    message: "Unusual rapid inventory decrease",
    detectedAt: "35 minutes ago",
    product: {
      name: "Wireless Earbuds Pro",
      sku: "WEP-2023-BLK",
      prevValue: 56,
      currValue: 12,
      unit: "units"
    },
    suggestedAction: "Verify inventory count and check for discrepancies"
  },
  {
    id: "anom-2",
    type: "price_change",
    severity: "warning",
    channel: "walmart",
    message: "Competitor price significantly reduced",
    detectedAt: "2 hours ago",
    product: {
      name: "Stainless Steel Water Bottle",
      sku: "SSWB-32-SLV",
      prevValue: 24.99,
      currValue: 16.99,
      unit: "USD"
    },
    suggestedAction: "Review pricing strategy for this product"
  },
  {
    id: "anom-3",
    type: "conversion_drop",
    severity: "warning",
    channel: "shopify",
    message: "Conversion rate dropped significantly",
    detectedAt: "6 hours ago",
    product: {
      name: "Smart LED Light Bulbs",
      sku: "SLB-RGBW-4PK",
      prevValue: 8.2,
      currValue: 3.5,
      unit: "%"
    },
    suggestedAction: "Check product page for issues and review recent negative reviews"
  }
];

// Helper to get icon for anomaly type
const getAnomalyIcon = (type: AnomalyType) => {
  switch (type) {
    case "stock_movement":
      return <AlertTriangle className="h-4 w-4" />;
    case "price_change":
      return <Activity className="h-4 w-4" />;
    case "conversion_drop":
      return <ArrowUpRight className="h-4 w-4 rotate-180" />;
    case "sell_through_drop":
      return <Info className="h-4 w-4" />;
  }
};

// Helper to get channel icon
const getChannelIcon = (channel: ChannelType) => {
  switch (channel) {
    case "amazon":
      return <Store className="h-4 w-4" />;
    case "walmart":
      return <ShoppingCart className="h-4 w-4" />;
    case "shopify":
      return <Archive className="h-4 w-4" />;
  }
};

// Helper to get severity styles
const getSeverityStyles = (severity: AnomalySeverity) => {
  switch (severity) {
    case "critical":
      return {
        bg: "bg-red-100 dark:bg-red-900",
        text: "text-red-800 dark:text-red-300",
        icon: "text-red-500"
      };
    case "warning":
      return {
        bg: "bg-yellow-100 dark:bg-yellow-900",
        text: "text-yellow-800 dark:text-yellow-300",
        icon: "text-yellow-500"
      };
    case "info":
      return {
        bg: "bg-blue-100 dark:bg-blue-900",
        text: "text-blue-800 dark:text-blue-300",
        icon: "text-blue-500"
      };
  }
};

// Single anomaly alert component
const AnomalyAlert = ({ anomaly }: { anomaly: AnomalyData }) => {
  const severityStyles = getSeverityStyles(anomaly.severity);
  
  return (
    <Alert 
      className={`mb-3 last:mb-0 border-l-4 ${
        anomaly.severity === "critical" ? "border-l-red-500" : 
        anomaly.severity === "warning" ? "border-l-yellow-500" : "border-l-blue-500"
      }`}
    >
      <div className="flex items-start gap-2">
        <div className={`p-1 rounded-full ${severityStyles.bg}`}>
          <div className={severityStyles.icon}>
            {getAnomalyIcon(anomaly.type)}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <AlertTitle className="text-sm font-medium mb-1 flex items-center gap-1.5">
              {anomaly.message}
              <Badge 
                variant="outline" 
                className={`ml-2 ${severityStyles.bg} ${severityStyles.text} border-0 text-xs font-normal`}
              >
                {getChannelIcon(anomaly.channel)}
                <span className="ml-1">{anomaly.channel}</span>
              </Badge>
            </AlertTitle>
            <span className="text-xs text-muted-foreground">{anomaly.detectedAt}</span>
          </div>
          
          <AlertDescription className="text-xs mt-1">
            <span className="font-medium">{anomaly.product.name}</span> ({anomaly.product.sku})
            <div className="flex items-center gap-2 mt-1">
              <div className="text-muted-foreground">
                {anomaly.type === "stock_movement" ? "Stock level" :
                 anomaly.type === "price_change" ? "Price" :
                 anomaly.type === "conversion_drop" ? "Conversion" : "Sell-through"}:
              </div>
              <div className="flex items-center gap-1">
                <span className="line-through text-muted-foreground">
                  {anomaly.product.prevValue}{anomaly.product.unit}
                </span>
                <span className="font-medium">
                  {anomaly.product.currValue}{anomaly.product.unit}
                </span>
              </div>
            </div>
            
            {anomaly.suggestedAction && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-xs font-normal underline text-primary hover:text-primary/80"
                  >
                    View suggested action
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Suggested Action</h4>
                    <p className="text-sm">{anomaly.suggestedAction}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export const AnomalyDetectionCard = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="font-semibold">Anomaly Detection</h3>
        </div>
        
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <Activity className="h-3.5 w-3.5" />
          <span>View All</span>
        </Button>
      </div>
      
      <div className="flex-grow overflow-auto">
        {anomalyData.map((anomaly) => (
          <AnomalyAlert key={anomaly.id} anomaly={anomaly} />
        ))}
      </div>
    </div>
  );
};

export default AnomalyDetectionCard;