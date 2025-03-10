import { Store, AlertTriangle, CheckCircle, AlertCircle, ShoppingCart, Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Badge } from "@/components/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/hover-card";

// Channel data type definitions
type ChannelMetric = {
  inStock: number;
  lowStock: number;
  outOfStock: number;
  totalSales: string;
  conversion: string;
  status: "healthy" | "warning" | "critical";
};

type ChannelData = {
  [key: string]: ChannelMetric;
};

// Mock data - would be fetched from an API in production
const channelData: ChannelData = {
  amazon: {
    inStock: 342,
    lowStock: 58,
    outOfStock: 17,
    totalSales: "$24,387.45",
    conversion: "5.8%",
    status: "healthy",
  },
  walmart: {
    inStock: 167,
    lowStock: 32,
    outOfStock: 8,
    totalSales: "$12,567.21",
    conversion: "4.2%",
    status: "warning",
  },
  shopify: {
    inStock: 86,
    lowStock: 24,
    outOfStock: 12,
    totalSales: "$8,973.56",
    conversion: "3.7%",
    status: "critical",
  },
};

// Get the total metrics across all channels
const getTotalMetrics = () => {
  return Object.values(channelData).reduce(
    (acc, channel) => {
      acc.inStock += channel.inStock;
      acc.lowStock += channel.lowStock;
      acc.outOfStock += channel.outOfStock;
      return acc;
    },
    { inStock: 0, lowStock: 0, outOfStock: 0 }
  );
};

// Helper function to get status icon
const getStatusIcon = (status: ChannelMetric["status"]) => {
  switch (status) {
    case "healthy":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "critical":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
  }
};

// Get channel icon
const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "amazon":
      return <Store className="h-4 w-4 mr-2" />;
    case "walmart":
      return <ShoppingCart className="h-4 w-4 mr-2" />;
    case "shopify":
      return <Archive className="h-4 w-4 mr-2" />;
    default:
      return <Store className="h-4 w-4 mr-2" />;
  }
};

// Get color for status badges
const getStatusColor = (status: ChannelMetric["status"]) => {
  switch (status) {
    case "healthy":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "warning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "critical":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  }
};

// Channel Badge component with hover card
const ChannelBadge = ({ 
  channel, 
  name, 
  data 
}: { 
  channel: string; 
  name: string; 
  data: ChannelMetric 
}) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <div className={`flex items-center px-3 py-1.5 rounded-full text-sm ${getStatusColor(data.status)} cursor-pointer`}>
        {getChannelIcon(channel)}
        <span className="font-medium">{name}</span>
        <span className="ml-2">{getStatusIcon(data.status)}</span>
      </div>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">{name} Performance Metrics</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Inventory Status</p>
            <div className="grid grid-cols-3 gap-1">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                <span>{data.inStock}</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                <span>{data.lowStock}</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                <span>{data.outOfStock}</span>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Total Sales</p>
            <p className="font-medium">{data.totalSales}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Conversion Rate</p>
            <p className="font-medium">{data.conversion}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Total SKUs</p>
            <p className="font-medium">{data.inStock + data.lowStock + data.outOfStock}</p>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

// Inventory metrics summary component
const InventoryMetrics = ({ 
  inStock, 
  lowStock, 
  outOfStock 
}: { 
  inStock: number; 
  lowStock: number; 
  outOfStock: number;
}) => (
  <div className="grid grid-cols-3 gap-4 mt-6">
    <div className="rounded-lg border p-3 text-center">
      <div className="flex justify-center mb-1">
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <div className="mt-1">
        <div className="text-xl font-semibold">{inStock}</div>
        <div className="text-xs text-muted-foreground">In Stock</div>
      </div>
    </div>
    
    <div className="rounded-lg border p-3 text-center">
      <div className="flex justify-center mb-1">
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
      </div>
      <div className="mt-1">
        <div className="text-xl font-semibold">{lowStock}</div>
        <div className="text-xs text-muted-foreground">Low Stock</div>
      </div>
    </div>
    
    <div className="rounded-lg border p-3 text-center">
      <div className="flex justify-center mb-1">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
      </div>
      <div className="mt-1">
        <div className="text-xl font-semibold">{outOfStock}</div>
        <div className="text-xs text-muted-foreground">Out of Stock</div>
      </div>
    </div>
  </div>
);

export const ChannelStatusCard = () => {
  const totalMetrics = getTotalMetrics();
  const totalSkus = totalMetrics.inStock + totalMetrics.lowStock + totalMetrics.outOfStock;
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <Store className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold">Inventory Summary</h3>
      </div>
      
      <div className="flex-grow">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="all" className="flex-1">All Channels</TabsTrigger>
            <TabsTrigger value="channels" className="flex-1">By Channel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{totalSkus}</div>
              <p className="text-sm text-muted-foreground">Total SKUs</p>
              
              <InventoryMetrics 
                inStock={totalMetrics.inStock} 
                lowStock={totalMetrics.lowStock} 
                outOfStock={totalMetrics.outOfStock} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="channels" className="space-y-4">
            <div className="flex flex-col gap-2">
              <ChannelBadge channel="amazon" name="Amazon" data={channelData.amazon} />
              <ChannelBadge channel="walmart" name="Walmart" data={channelData.walmart} />
              <ChannelBadge channel="shopify" name="Shopify" data={channelData.shopify} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChannelStatusCard;
