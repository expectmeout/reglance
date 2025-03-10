import { RefreshCw, Clock, AlertCircle, Store, ShoppingCart, Archive, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Progress } from "@/components/progress";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip";

// Define types for sync data
type SyncStatus = "completed" | "in_progress" | "error" | "pending";

type ChannelSync = {
  from: string;
  to: string;
  status: SyncStatus;
  progress: number;
  lastSync: string;
  errorMessage?: string;
};

// Mock data for channel sync status
const channelSyncData: ChannelSync[] = [
  {
    from: "amazon",
    to: "walmart",
    status: "completed",
    progress: 100,
    lastSync: "10 minutes ago",
  },
  {
    from: "amazon",
    to: "shopify",
    status: "in_progress",
    progress: 68,
    lastSync: "In progress",
  },
  {
    from: "walmart",
    to: "shopify",
    status: "error",
    progress: 45,
    lastSync: "3 hours ago",
    errorMessage: "API rate limit exceeded",
  },
  {
    from: "shopify",
    to: "amazon",
    status: "pending",
    progress: 0,
    lastSync: "Scheduled in 15 minutes",
  },
];

// Helper function to get channel icon
const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "amazon":
      return <Store className="h-4 w-4" />;
    case "walmart":
      return <ShoppingCart className="h-4 w-4" />;
    case "shopify":
      return <Archive className="h-4 w-4" />;
    default:
      return <Store className="h-4 w-4" />;
  }
};

// Helper function to get channel name
const getChannelName = (channel: string) => {
  switch (channel) {
    case "amazon":
      return "Amazon";
    case "walmart":
      return "Walmart";
    case "shopify":
      return "Shopify";
    default:
      return channel;
  }
};

// Helper function to get status color and icon
const getStatusColorAndIcon = (status: SyncStatus) => {
  switch (status) {
    case "completed":
      return {
        color: "text-green-500",
        bgColor: "bg-green-100 dark:bg-green-900",
        textColor: "text-green-800 dark:text-green-300",
        icon: <CheckCircle className="h-4 w-4" />,
      };
    case "in_progress":
      return {
        color: "text-blue-500",
        bgColor: "bg-blue-100 dark:bg-blue-900",
        textColor: "text-blue-800 dark:text-blue-300",
        icon: <RefreshCw className="h-4 w-4 animate-spin" />,
      };
    case "error":
      return {
        color: "text-red-500",
        bgColor: "bg-red-100 dark:bg-red-900",
        textColor: "text-red-800 dark:text-red-300",
        icon: <AlertCircle className="h-4 w-4" />,
      };
    case "pending":
      return {
        color: "text-gray-500",
        bgColor: "bg-gray-100 dark:bg-gray-800",
        textColor: "text-gray-800 dark:text-gray-300",
        icon: <Clock className="h-4 w-4" />,
      };
  }
};

// Helper function to get progress bar color
const getProgressColor = (status: SyncStatus) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "in_progress":
      return "bg-blue-500";
    case "error":
      return "bg-red-500";
    case "pending":
      return "bg-gray-300 dark:bg-gray-700";
  }
};

// Single sync item component
const SyncItem = ({ sync }: { sync: ChannelSync }) => {
  const statusStyle = getStatusColorAndIcon(sync.status);
  
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="mr-1">{getChannelIcon(sync.from)}</span>
            <span className="text-sm font-medium">{getChannelName(sync.from)}</span>
          </div>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <div className="flex items-center">
            <span className="mr-1">{getChannelIcon(sync.to)}</span>
            <span className="text-sm font-medium">{getChannelName(sync.to)}</span>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className={`${statusStyle.bgColor} ${statusStyle.textColor}`}>
                <span className="flex items-center gap-1">
                  {statusStyle.icon}
                  <span className="text-xs">
                    {sync.status === "completed" ? "Synced" : 
                     sync.status === "in_progress" ? "Syncing" : 
                     sync.status === "error" ? "Failed" : "Pending"}
                  </span>
                </span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {sync.status === "completed" ? "Sync completed successfully" :
               sync.status === "in_progress" ? "Sync in progress" :
               sync.status === "error" ? `Error: ${sync.errorMessage}` :
               "Sync scheduled"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="space-y-2">
        <Progress 
          value={sync.progress} 
          className={`h-1.5 ${sync.status === "error" ? "bg-red-200 dark:bg-red-950" : ""}`} 
          indicatorClassName={getProgressColor(sync.status)}
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{sync.lastSync}</span>
          </div>
          
          {sync.status === "error" && (
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const SyncStatusCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-full">
              <RefreshCw className="h-5 w-5 text-blue-500" />
            </div>
            <CardTitle>Inventory Sync Status</CardTitle>
          </div>
          
          <Button variant="outline" size="sm" className="h-8">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Sync All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex-grow">
          <div className="space-y-1 divide-y divide-border">
            {channelSyncData.map((sync, index) => (
              <SyncItem key={`${sync.from}-${sync.to}`} sync={sync} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyncStatusCard;
