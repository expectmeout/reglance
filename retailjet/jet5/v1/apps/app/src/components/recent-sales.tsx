"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { ScrollArea } from "@/components/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Input } from "@/components/input";
import {
  CalendarIcon,
  ChevronRight,
  CopyIcon,
  ExternalLinkIcon,
  FilterIcon,
  MoreHorizontal,
  PackageIcon,
  PrinterIcon,
  SearchIcon,
  TruckIcon,
  CircleCheckIcon,
  TimerIcon,
  CircleAlertIcon,
  ShoppingBagIcon,
} from "lucide-react";

// Sample order data
const initialOrders = [
  {
    id: "ord-001",
    customerName: "Olivia Martin",
    customerEmail: "olivia.martin@example.com",
    channel: "amazon",
    channelIcon: "/amazon-icon.svg", // This would be your actual asset path
    orderNumber: "111-6288670-7977852",
    date: "2024-03-01",
    total: 1999.0,
    status: "Delivered",
    items: [
      { id: "item-1", name: "Ultra Comfort Pillow", quantity: 2, price: 29.99 },
      { id: "item-2", name: "Wireless Earbuds Pro", quantity: 1, price: 149.99 },
    ],
    shippingAddress: "123 Main St, Austin, TX 78701",
    trackingNumber: "1Z999AA10123456784",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "ord-002",
    customerName: "Jackson Lee",
    customerEmail: "jackson.lee@example.com",
    channel: "walmart",
    channelIcon: "/walmart-icon.svg",
    orderNumber: "111-6288670-7977853",
    date: "2024-03-02",
    total: 39.0,
    status: "Processing",
    items: [
      { id: "item-3", name: "Stainless Steel Water Bottle", quantity: 1, price: 19.99 },
      { id: "item-4", name: "Organic Cotton Bath Towels", quantity: 1, price: 19.99 },
    ],
    shippingAddress: "456 Oak St, Seattle, WA 98101",
    trackingNumber: null,
    paymentMethod: "Mastercard ending in 8888",
  },
  {
    id: "ord-003",
    customerName: "Isabella Nguyen",
    customerEmail: "isabella.nguyen@example.com",
    channel: "shopify",
    channelIcon: "/shopify-icon.svg",
    orderNumber: "111-6288670-7977854",
    date: "2024-03-03",
    total: 299.0,
    status: "Shipped",
    items: [
      { id: "item-5", name: "Premium Kitchen Knife Set", quantity: 1, price: 129.99 },
      { id: "item-6", name: "Smart LED Light Bulbs (4-Pack)", quantity: 2, price: 39.99 },
    ],
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    trackingNumber: "9400111202555842761507",
    paymentMethod: "PayPal",
  },
  {
    id: "ord-004",
    customerName: "William Kim",
    customerEmail: "william.kim@example.com",
    channel: "amazon",
    channelIcon: "/amazon-icon.svg",
    orderNumber: "111-6288670-7977855",
    date: "2024-03-04",
    total: 99.0,
    status: "Shipped",
    items: [
      { id: "item-7", name: "Professional Hair Dryer", quantity: 1, price: 59.99 },
      { id: "item-8", name: "Natural Bamboo Cutting Board", quantity: 1, price: 24.99 },
    ],
    shippingAddress: "101 Cedar St, Boston, MA 02108",
    trackingNumber: "9405511899562764307733",
    paymentMethod: "Visa ending in 1234",
  },
  {
    id: "ord-005",
    customerName: "Sophia Rodriguez",
    customerEmail: "sophia.rodriguez@example.com",
    channel: "shopify",
    channelIcon: "/shopify-icon.svg",
    orderNumber: "111-6288670-7977856",
    date: "2024-03-05",
    total: 499.0,
    status: "Pending",
    items: [
      { id: "item-9", name: "Waterproof Bluetooth Speaker", quantity: 1, price: 49.99 },
      { id: "item-10", name: "Adjustable Desk Lamp", quantity: 1, price: 44.99 },
    ],
    shippingAddress: "555 Elm St, Denver, CO 80202",
    trackingNumber: null,
    paymentMethod: "American Express ending in 3456",
  },
];

// Status to icon mapping
const statusIcons = {
  Pending: <CircleAlertIcon className="h-3.5 w-3.5 text-yellow-500" />,
  Processing: <TimerIcon className="h-3.5 w-3.5 text-blue-500" />,
  Shipped: <TruckIcon className="h-3.5 w-3.5 text-indigo-500" />,
  Delivered: <CircleCheckIcon className="h-3.5 w-3.5 text-green-500" />,
};

// Channel Logo component for consistent appearance
const ChannelLogo = ({ channel, className = "" }) => {
  const channelInfo = {
    amazon: { name: "Amazon", color: "bg-[#FF9900]/20", textColor: "text-[#FF9900]", logo: "/amazon-icon.svg", fallback: "AM" },
    walmart: { name: "Walmart", color: "bg-[#0071DC]/20", textColor: "text-[#0071DC]", logo: "/walmart-icon.svg", fallback: "WM" },
    shopify: { name: "Shopify", color: "bg-[#96BF48]/20", textColor: "text-[#96BF48]", logo: "/shopify-icon.svg", fallback: "SH" },
  };

  const info = channelInfo[channel] || { name: channel, color: "bg-gray-200", textColor: "text-gray-700", fallback: channel.substring(0, 2).toUpperCase() };

  return (
    <Avatar className={`h-8 w-8 ${info.color} ${className}`}>
      <AvatarImage src={info.logo} alt={info.name} />
      <AvatarFallback className={info.textColor}>{info.fallback}</AvatarFallback>
    </Avatar>
  );
};

// Order Timeline for visualizing order progress
const OrderTimeline = ({ status }) => {
  const steps = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex items-center w-full my-3">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="relative flex flex-col items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                index < currentIndex
                  ? "bg-primary"
                  : index === currentIndex
                  ? "bg-primary ring-2 ring-primary/30"
                  : "bg-muted"
              }`}
            />
            <span className="mt-1 text-[10px] text-muted-foreground">
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-[1px] flex-1 ${
                index < currentIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Order Analytics summary component
const OrderAnalytics = ({ orders }) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
  const processingOrders = orders.filter((order) => order.status === "Processing").length;
  const shippedOrders = orders.filter((order) => order.status === "Shipped").length;

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      <div className="bg-muted/40 rounded-lg p-2 text-center">
        <p className="text-xs text-muted-foreground">Average Order</p>
        <p className="text-lg font-bold">${averageOrder.toFixed(2)}</p>
      </div>
      <div className="bg-muted/40 rounded-lg p-2 text-center">
        <p className="text-xs text-muted-foreground">Total Orders</p>
        <p className="text-lg font-bold">{totalOrders}</p>
      </div>
      <div className="bg-muted/40 rounded-lg p-2 text-center">
        <p className="text-xs text-muted-foreground">Pending</p>
        <p className="text-lg font-bold">{pendingOrders}</p>
        <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 rounded-full"
            style={{ width: `${(pendingOrders / totalOrders) * 100}%` }}
          />
        </div>
      </div>
      <div className="bg-muted/40 rounded-lg p-2 text-center">
        <p className="text-xs text-muted-foreground">Processing</p>
        <p className="text-lg font-bold">{processingOrders}</p>
        <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${(processingOrders / totalOrders) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Main component renamed to RecentSales
export function RecentSales() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      activeTab === "all" ||
      order.status.toLowerCase() === activeTab.toLowerCase();

    const search = searchQuery.toLowerCase();
    const searchMatch =
      order.customerName.toLowerCase().includes(search) ||
      order.orderNumber.toLowerCase().includes(search) ||
      order.status.toLowerCase().includes(search);

    return statusMatch && searchMatch;
  });

  // Date formatting function
  const formatDate = (dateString) => {
    // Force UTC timezone to match server rendering
    const date = new Date(dateString + 'T00:00:00Z');
    return date.toLocaleDateString("en-US", {
      timeZone: "UTC",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Copy order number to clipboard
  const copyOrderNumber = (orderNumber) => {
    navigator.clipboard.writeText(orderNumber);
    toast.success("Order number copied", {
      description: `${orderNumber} has been copied to clipboard`,
      duration: 3000,
    });
  };

  // Status badge styling
  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Shipped":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  // View tracking page
  const viewTracking = (order) => {
    if (!order.trackingNumber) {
      toast.error("Tracking unavailable", {
        description: "This order doesn't have tracking information yet.",
        duration: 3000,
      });
      return;
    }

    window.open(`https://example.com/tracking/${order.trackingNumber}`, "_blank");

    toast.info("Opening tracking page", {
      description: `Tracking ${order.trackingNumber}`,
      duration: 3000,
    });
  };

  // Print order details
  const printOrder = (order) => {
    toast.info("Printing order", {
      description: `Preparing ${order.orderNumber} for printing`,
      duration: 3000,
    });
    // In a real implementation, this would open a print dialog with order details
  };

  // Currency formatter
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Add keyboard shortcut for search (Command+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("order-search").focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Toaster />
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Recent Orders</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <span>Showing the last {orders.length} orders</span>
              <button
                className="inline-flex items-center text-xs text-primary hover:underline ml-1"
                onClick={() => { /* View all orders logic */ }}
              >
                <span>View all</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-[180px] transition-all duration-200 focus-within:w-[250px]">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="order-search"
                type="search"
                placeholder="Search orders..."
                className="pl-8 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 top-2 text-xs text-muted-foreground pointer-events-none hidden sm:block">
                <kbd className="px-1.5 py-0.5 border rounded-md bg-muted text-[10px]">⌘</kbd>
                <kbd className="px-1.5 py-0.5 border rounded-md bg-muted text-[10px] ml-1">K</kbd>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab("all")}>
                  All Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("pending")}>
                  Pending Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("processing")}>
                  Processing Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("shipped")}>
                  Shipped Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("delivered")}>
                  Delivered Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Date Range
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="px-6 pt-4">
            <OrderAnalytics orders={filteredOrders} />
          </div>

          <ScrollArea className="h-[420px]">
            <div className="px-6">
            <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Customer</TableHead>
      <TableHead className="text-center w-20">Channel</TableHead>
      <TableHead className="w-24">Date</TableHead>
      <TableHead className="text-right">Total</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="w-12 text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredOrders.length === 0 ? (
      <TableRow>
        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
          <div className="flex flex-col items-center justify-center">
            <PackageIcon className="h-8 w-8 mb-2 opacity-30" />
            <p>No orders found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </TableCell>
      </TableRow>
    ) : (
      filteredOrders.map((order) => (
        <HoverCard key={order.id} openDelay={300} closeDelay={200}>
          <HoverCardTrigger asChild>
            <TableRow
              key={order.id}
              className="group cursor-default hover:bg-muted/50 transition-colors"
            >
              <TableCell>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-xs text-muted-foreground hidden md:block">
                  <span className="flex items-center">
                    {order.orderNumber}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyOrderNumber(order.orderNumber);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                    >
                      <CopyIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                    </button>
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <ChannelLogo channel={order.channel} />
                </div>
              </TableCell>
              <TableCell>{formatDate(order.date)}</TableCell>
              <TableCell className="text-right">
                {currencyFormatter.format(order.total)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  {statusIcons[order.status]}
                  <Badge className={getStatusClasses(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => copyOrderNumber(order.orderNumber)}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Copy Order #
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => viewTracking(order)}
                      disabled={!order.trackingNumber}
                    >
                      <TruckIcon className="mr-2 h-4 w-4" />
                      Track Shipment
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => printOrder(order)}>
                      <PrinterIcon className="mr-2 h-4 w-4" />
                      Print Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <ExternalLinkIcon className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-4" side="right">
            <div className="space-y-3">
              {/* Header with customer info and status */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{order.customerName}</h4>
                  <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                </div>
                <Badge className={getStatusClasses(order.status)}>
                  {order.status}
                </Badge>
              </div>

              {/* Order timeline visualization */}
              <OrderTimeline status={order.status} />

              {/* Order details */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order #:</span>
                  <span className="font-mono">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{formatDate(order.date)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-medium">{currencyFormatter.format(order.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment:</span>
                  <span>{order.paymentMethod}</span>
                </div>
              </div>

              {/* Order items */}
              <div>
                <h5 className="text-sm font-medium mb-2">Items</h5>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-1">
                      <ShoppingBagIcon className="h-3 w-3 text-muted-foreground" />
                      <span>
                        {item.name} {item.quantity > 1 && `(${item.quantity})`}
                      </span>
                    </div>
                    <span>{currencyFormatter.format(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Shipping info */}
              <div>
                <h5 className="text-sm font-medium mb-1">Shipping</h5>
                <p className="text-xs text-muted-foreground mb-1">{order.shippingAddress}</p>
                {order.trackingNumber && (
                  <div className="flex items-center text-xs">
                    <span className="text-muted-foreground mr-1">Tracking:</span>
                    <span className="font-mono">{order.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="flex justify-end gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => printOrder(order)}
                >
                  <PrinterIcon className="h-3 w-3 mr-1" />
                  Print
                </Button>
                <Button
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => {/* View details logic */}}
                >
                  View Details
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))
    )}
  </TableBody>
</Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}