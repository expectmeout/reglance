import React, { useState, useMemo } from 'react';
import { InventoryItem } from './inventory-data-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, TrendingDown, TrendingUp, AlertTriangle, DollarSign, BarChart, Store, ShoppingCart, Archive } from "lucide-react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ScrollArea } from "@/components/scroll-area";
import { Progress } from "@/components/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/hover-card";

// Channel data types
type Channel = "amazon" | "walmart" | "shopify";

interface ChannelAllocation {
  channel: Channel;
  currentAllocation: number;
  suggestedAllocation: number;
  profitMargin: number;
  salesVelocity: number;
  stockLevel: number;
  revenue: number;
}

// Mock channel data
const channelData: ChannelAllocation[] = [
  {
    channel: "amazon",
    currentAllocation: 500,
    suggestedAllocation: 600,
    profitMargin: 32,
    salesVelocity: 15,
    stockLevel: 85,
    revenue: 24999.95
  },
  {
    channel: "walmart",
    currentAllocation: 300,
    suggestedAllocation: 250,
    profitMargin: 28,
    salesVelocity: 8,
    stockLevel: 120,
    revenue: 14999.95
  },
  {
    channel: "shopify",
    currentAllocation: 200,
    suggestedAllocation: 150,
    profitMargin: 45,
    salesVelocity: 5,
    stockLevel: 95,
    revenue: 9999.95
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
    default:
      return <Store className="h-4 w-4" />;
  }
};

// Helper function to get channel name
const getChannelName = (channel: Channel) => {
  return channel.charAt(0).toUpperCase() + channel.slice(1);
};

// Enhanced interface with additional properties
interface EnhancedInventoryItem extends InventoryItem {
  turnoverRate?: number;
  valuationAmount?: number;
  profitMargin?: number;
  salesVelocity?: number;
  leadTime?: number;
  dynamicReorderPoint?: number;
  stockoutRisk?: 'Low' | 'Medium' | 'High';
  restockPriority?: 'Low' | 'Medium' | 'High' | 'Critical';
  channel?: Channel;
}

interface EnhancedInventoryDataTableProps {
  data: InventoryItem[];
}

// Helper function to calculate dynamic reorder point based on sales velocity and lead time
const calculateDynamicReorderPoint = (item: EnhancedInventoryItem): number => {
  const baseReorderPoint = item.reorderPoint;
  const leadTime = item.leadTime || 7; // Default lead time of 7 days if not provided
  const salesVelocity = item.salesVelocity || (item.stock / (item.daysOfSupply || 30)); // Estimate sales velocity
  
  // Dynamic reorder point formula: Base reorder point + (Sales velocity * Lead time * safety factor)
  const safetyFactor = 1.5; // Adjustable safety factor
  return Math.round(baseReorderPoint + (salesVelocity * leadTime * safetyFactor));
};

// Helper function to calculate stockout risk
const calculateStockoutRisk = (item: EnhancedInventoryItem): 'Low' | 'Medium' | 'High' => {
  const daysUntilStockout = item.daysOfSupply || 0;
  
  if (daysUntilStockout > 30) return 'Low';
  if (daysUntilStockout > 14) return 'Medium';
  return 'High';
};

// Helper function to calculate restock priority
const calculateRestockPriority = (item: EnhancedInventoryItem): 'Low' | 'Medium' | 'High' | 'Critical' => {
  const stockoutRisk = item.stockoutRisk || calculateStockoutRisk(item);
  const profitMargin = item.profitMargin || 0.3; // Default 30% profit margin
  
  if (item.stock === 0) return 'Critical';
  if (stockoutRisk === 'High' && profitMargin > 0.4) return 'High';
  if (stockoutRisk === 'Medium' || (stockoutRisk === 'High' && profitMargin <= 0.4)) return 'Medium';
  return 'Low';
};

// Helper function to get status badge variant
function getStatusBadge(status: string): "destructive" | "secondary" | "default" | "outline" | null | undefined {
  switch (status) {
    case "Out of Stock":
      return "destructive";
    case "Low Stock":
      return "secondary";
    case "Excess Stock":
      return "secondary";
    case "In Stock":
      return "default";
    default:
      return "outline";
  }
}

// Helper function to get priority badge variant
function getPriorityBadge(priority: string): "destructive" | "secondary" | "default" | "outline" | null | undefined {
  switch (priority) {
    case "Critical":
      return "destructive";
    case "High":
      return "secondary";
    case "Medium":
      return "default";
    case "Low":
      return "outline";
    default:
      return "outline";
  }
}

// Metrics comparison component
const MetricsComparison = ({ 
  currentMetrics,
  projectedMetrics 
}: { 
  currentMetrics: { revenue: number; margin: number };
  projectedMetrics: { revenue: number; margin: number };
}) => {
  const revenueChange = ((projectedMetrics.revenue - currentMetrics.revenue) / currentMetrics.revenue) * 100;
  const marginChange = projectedMetrics.margin - currentMetrics.margin;
  
  return (
    <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg mb-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Current</h4>
        <div className="space-y-1">
          <div className="text-2xl font-bold">
            ${currentMetrics.revenue.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentMetrics.margin.toFixed(1)}% avg margin
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Projected</h4>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-primary">
            ${projectedMetrics.revenue.toLocaleString()}
            <span className="text-sm font-normal text-green-500 ml-1">
              (+{revenueChange.toFixed(1)}%)
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {projectedMetrics.margin.toFixed(1)}% avg margin
            <span className={`ml-1 ${marginChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ({marginChange >= 0 ? '+' : ''}{marginChange.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Channel metrics card component
const ChannelMetricsCard = ({ allocation }: { allocation: ChannelAllocation }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base">
          {getChannelIcon(allocation.channel)}
          <span className="ml-2">{getChannelName(allocation.channel)} Channel Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Sales Velocity</p>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
              <div className="text-xl font-semibold">{allocation.salesVelocity}</div>
              <div className="ml-1 text-sm text-muted-foreground">units/day</div>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Stock Level</p>
            <div className="flex items-center">
              <BarChart className="h-4 w-4 text-blue-500 mr-2" />
              <div className="text-xl font-semibold">{allocation.stockLevel}</div>
              <div className="ml-1 text-sm text-muted-foreground">units</div>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Profit Margin</p>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-amber-500 mr-2" />
              <div className="text-xl font-semibold">{allocation.profitMargin}%</div>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Revenue</p>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-500 mr-2" />
              <div className="text-xl font-semibold">${allocation.revenue.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EnhancedInventoryDataTable: React.FC<EnhancedInventoryDataTableProps> = ({ data }) => {
  // Enhance the data with calculated fields
  const enhancedData = useMemo(() => {
    return data.map(item => {
      const enhancedItem: EnhancedInventoryItem = {
        ...item,
        // Calculate additional metrics
        leadTime: Math.floor(Math.random() * 10) + 3, // Simulated lead time (3-12 days)
        salesVelocity: item.stock / (item.daysOfSupply || 30), // Estimated daily sales
        turnoverRate: 365 / (item.daysOfSupply || 30), // Annual turnover rate
        valuationAmount: item.stock * item.price, // Total inventory value
        profitMargin: 0.3 + (Math.random() * 0.3), // Simulated profit margin (30-60%)
        // Assign a random channel for demonstration
        channel: ["amazon", "walmart", "shopify"][Math.floor(Math.random() * 3)] as Channel
      };
      
      // Calculate dynamic metrics
      enhancedItem.dynamicReorderPoint = calculateDynamicReorderPoint(enhancedItem);
      enhancedItem.stockoutRisk = calculateStockoutRisk(enhancedItem);
      enhancedItem.restockPriority = calculateRestockPriority(enhancedItem);
      
      return enhancedItem;
    });
  }, [data]);

  // State for table functionality
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"inventory" | "channel">("inventory");
  const [selectedChannel, setSelectedChannel] = useState<Channel>("amazon");

  // Calculate metrics for the channel analysis view
  const currentMetrics = {
    revenue: channelData.reduce((sum, a) => sum + a.revenue, 0),
    margin: channelData.reduce((sum, a) => sum + a.profitMargin, 0) / channelData.length
  };
  
  const projectedMetrics = {
    revenue: currentMetrics.revenue * 1.15, // Example projection
    margin: currentMetrics.margin + 2.5
  };

  // Get the currently selected channel allocation
  const getSelectedChannelAllocation = () => {
    const selected = channelData.find(c => c.channel === selectedChannel);
    return selected || channelData[0]; // Fallback to first channel if not found
  };

  // Define columns for the enhanced table
  const columns: ColumnDef<EnhancedInventoryItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="px-1">
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-4 w-4 rounded border-gray-300"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 rounded border-gray-300"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Item Name",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium">{row.getValue("name")}</span>
            <span className="text-xs text-muted-foreground">{row.original.sku}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ row }) => {
        const stock = parseInt(row.getValue("stock"));
        const optimal = row.original.optimalStock;
        const percentage = Math.min(100, Math.round((stock / optimal) * 100));
        
        return (
          <div className="flex flex-col w-32">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{stock}</span>
              <span className="text-xs text-muted-foreground">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        );
      },
    },
    {
      accessorKey: "daysOfSupply",
      header: ({ column }) => (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Days of Supply
          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ row }) => {
        const daysOfSupply = parseInt(row.getValue("daysOfSupply"));
        const icon = daysOfSupply < 14 ? 
          <TrendingDown className="h-4 w-4 text-destructive inline ml-1" /> : 
          <TrendingUp className="h-4 w-4 text-green-500 inline ml-1" />;
        
        return (
          <div className="flex items-center">
            <span>{daysOfSupply} days</span>
            {icon}
          </div>
        );
      },
    },
    {
      accessorKey: "dynamicReorderPoint",
      header: ({ column }) => (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Dynamic Reorder Point
          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ row }) => {
        const dynamicPoint = row.original.dynamicReorderPoint || 0;
        const staticPoint = row.original.reorderPoint;
        const difference = dynamicPoint - staticPoint;
        
        return (
          <div className="flex flex-col">
            <span>{dynamicPoint}</span>
            {difference !== 0 && (
              <span className={`text-xs ${difference > 0 ? 'text-amber-500' : 'text-green-500'}`}>
                {difference > 0 ? `+${difference}` : difference} from static
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "restockPriority",
      header: "Restock Priority",
      cell: ({ row }) => {
        const priority = row.original.restockPriority || 'Low';
        return (
          <Badge variant={getPriorityBadge(priority)}>
            {priority}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: EnhancedInventoryItem['status'] = row.getValue("status");
        return (
          <Badge variant={getStatusBadge(status)}>
            {status}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "valuationAmount",
      header: ({ column }) => (
        <div className="text-right" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Inventory Value
          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ row }) => {
        const amount = row.original.valuationAmount || 0;
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "turnoverRate",
      header: ({ column }) => (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Turnover Rate
          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ row }) => {
        const rate = row.original.turnoverRate || 0;
        return <div>{rate.toFixed(1)}x per year</div>;
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <div>{row.getValue("location")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item.id)}
              >
                Copy Item ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Update Stock</DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Adjust Reorder Point</DropdownMenuItem>
              <DropdownMenuItem>View Trend Analysis</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Create table instance
  const table = useReactTable({
    data: enhancedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Filter data based on active tab
  const filteredData = useMemo(() => {
    if (activeTab === "all") return enhancedData;
    if (activeTab === "lowStock") return enhancedData.filter(item => item.status === "Low Stock");
    if (activeTab === "outOfStock") return enhancedData.filter(item => item.status === "Out of Stock");
    if (activeTab === "highPriority") return enhancedData.filter(item => 
      item.restockPriority === "High" || item.restockPriority === "Critical"
    );
    return enhancedData;
  }, [enhancedData, activeTab]);

  // Calculate summary metrics
  const totalItems = enhancedData.length;
  const totalValue = enhancedData.reduce((sum, item) => sum + (item.valuationAmount || 0), 0);
  const lowStockItems = enhancedData.filter(item => item.status === "Low Stock").length;
  const outOfStockItems = enhancedData.filter(item => item.status === "Out of Stock").length;
  const highPriorityItems = enhancedData.filter(item => 
    item.restockPriority === "High" || item.restockPriority === "Critical"
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "inventory" | "channel")} className="mr-4">
            <TabsList>
              <TabsTrigger value="inventory">Inventory Analysis</TabsTrigger>
              <TabsTrigger value="channel">Channel Analysis</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {viewMode === "inventory" && (
            <Input
              placeholder="Filter items..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )}
          
          {viewMode === "channel" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  {getChannelIcon(selectedChannel)}
                  <span className="ml-2">{getChannelName(selectedChannel)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Channel</DropdownMenuLabel>
                {channelData.map((channel) => (
                  <DropdownMenuItem 
                    key={channel.channel}
                    onClick={() => setSelectedChannel(channel.channel)}
                    className="flex items-center"
                  >
                    {getChannelIcon(channel.channel)}
                    <span className="ml-2">{getChannelName(channel.channel)}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {viewMode === "inventory" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Columns</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuItem
                        key={column.id}
                        className="capitalize"
                        onClick={() => column.toggleVisibility(!column.getIsVisible())}
                      >
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={() => column.toggleVisibility(!column.getIsVisible())}
                          className="mr-2 h-4 w-4"
                        />
                        {column.id}
                      </DropdownMenuItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Channel Analysis View */}
      {viewMode === "channel" && (
        <>
          <MetricsComparison
            currentMetrics={currentMetrics}
            projectedMetrics={projectedMetrics}
          />
          
          <ChannelMetricsCard 
            allocation={getSelectedChannelAllocation()} 
          />
          
          <div className="bg-muted/40 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-medium mb-2">Channel Performance Items</h3>
            <p className="text-muted-foreground mb-4">
              Items allocated to {getChannelName(selectedChannel)} channel, sorted by performance.
            </p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sales Velocity</TableHead>
                  <TableHead>Profit Margin</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enhancedData
                  .filter(item => item.channel === selectedChannel)
                  .sort((a, b) => (b.profitMargin || 0) - (a.profitMargin || 0))
                  .slice(0, 5)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.salesVelocity?.toFixed(1)}/day</TableCell>
                      <TableCell>{(item.profitMargin || 0).toFixed(0)}%</TableCell>
                      <TableCell className="text-right">
                        ${item.valuationAmount?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Channel Allocation Recommendations</CardTitle>
              <CardDescription>
                Optimize inventory allocation across sales channels for maximum revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channelData.map((allocation) => {
                  const currentPercentage = (allocation.currentAllocation / 1000) * 100;
                  const suggestedPercentage = (allocation.suggestedAllocation / 1000) * 100;
                  const isSelected = allocation.channel === selectedChannel;
                  
                  return (
                    <div 
                      key={allocation.channel}
                      className={`p-4 rounded-lg border ${isSelected ? 'border-primary bg-primary/5' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getChannelIcon(allocation.channel)}
                          <span className="font-medium">{getChannelName(allocation.channel)}</span>
                        </div>
                        <Badge variant={isSelected ? "default" : "outline"}>
                          {allocation.currentAllocation} units ({currentPercentage.toFixed(1)}%)
                        </Badge>
                      </div>
                      
                      <Progress value={currentPercentage} className="h-2 mb-2" />
                      
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{allocation.salesVelocity}/day</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{allocation.profitMargin}% margin</span>
                        </div>
                      </div>
                      
                      {allocation.currentAllocation !== allocation.suggestedAllocation && (
                        <div className="text-sm mt-2 text-muted-foreground flex items-center">
                          <Badge variant="outline" className="mr-2">Suggested</Badge>
                          {allocation.suggestedAllocation} units ({suggestedPercentage.toFixed(1)}%)
                          {allocation.suggestedAllocation > allocation.currentAllocation ? (
                            <TrendingUp className="h-3.5 w-3.5 text-green-500 ml-1" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5 text-amber-500 ml-1" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                <div className="flex justify-end mt-4">
                  <Button className="mr-2" variant="outline">Reset</Button>
                  <Button>Apply Recommendations</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Inventory Analysis View */}
      {viewMode === "inventory" && (
        <>
          {/* Tabs for filtering */}
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="lowStock">Low Stock</TabsTrigger>
              <TabsTrigger value="outOfStock">Out of Stock</TabsTrigger>
              <TabsTrigger value="highPriority">High Priority</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Table */}
          <div className="rounded-md border">
            <ScrollArea className="h-[calc(100vh-350px)]">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedInventoryDataTable;
